import { useEffect, useRef } from "react";
import {isEqual} from "lodash";

function deepCompareEquals(a: any, b: any) {
    return isEqual(a, b);
}

function useDeepCompareMemoize(value: any) {
    const ref = useRef();

    if (!deepCompareEquals(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

export function useDeepCompareEffect(callback: ()=>void, dependencies: ReadonlyArray<any>) {
    useEffect(
        callback,
        dependencies.map(useDeepCompareMemoize)
    )
}