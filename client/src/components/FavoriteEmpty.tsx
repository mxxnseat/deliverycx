const FavoriteEmpty = () : JSX.Element => {
  return (
    <div className="favorite_empty">
      <div className="favorite_empty__title">
        <span className="favorite_empty__title-red">Добавляй в избранное</span>
        <span>свои любимые блюда</span>
      </div>
      <img className="favorite_empty__img" src={require("../assets/img/favorite_empty.png").default}  />
    </div>
  )
}
export default FavoriteEmpty;