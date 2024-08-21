import '../css/amount.css'

export default function Amount({ amount, setAmount, setDecrease, setIncrease, disabled }) {

  return (
    <div className="product-display">
      <div className="quantity-container">
        <button disabled={disabled} className="qty-count qty-count--minus" onClick={() => setDecrease()}>-</button>
        <input className="quantity" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} readOnly={true}></input>
        <button disabled={disabled} className="qty-count qty-count--add" onClick={() => setIncrease()}>+</button>
      </div>
    </div>
  )
}
