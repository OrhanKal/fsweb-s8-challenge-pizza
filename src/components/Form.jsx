import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ButtonGroup } from 'reactstrap';


export default function Form() {
    const [pizzaSize, setPizzaSize] = useState('');
    const [crustSize, setCrustSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(85.50);
    const [name, setName] = useState('');

    const toppingsList = [
        { id: 'pepperoni', name: 'Pepperoni' },
        { id: 'sosis', name: 'Sosis' },
        { id: 'kanadajambonu', name: 'Kanada Jambonu' },
        { id: 'tavukizgara', name: 'Tavuk Izgara' },
        { id: 'sogan', name: 'Soğan' },
        { id: 'domates', name: 'Domates' },
        { id: 'misir', name: 'Mısır' },
        { id: 'sucuk', name: 'Sucuk' },
        { id: 'jalepeno', name: 'Jalepeno' },
        { id: 'sarimsak', name: 'Sarımsak' },
        { id: 'biber', name: 'Biber' },
        { id: 'ananas', name: 'Ananas' },
        { id: 'kabak', name: 'Kabak' },
    ];

    useEffect(() => {
        calculateTotal();
    }, [toppings, quantity]);

    const handleSizeChange = (e) => {
        setPizzaSize(e.target.value);
    };

    const handleCrustChange = (e) => {
        setCrustSize(e.target.value);
    };

    const handleToppingChange = (e) => {
        const { value, checked } = e.target;
        const toppingPrice = 5; //her malzeme 5tl

        if (checked) {
            if (toppings.length >= 10) {
                alert("En fazla 10 malzeme seçebilirsiniz.");
                return;
            }
            setToppings((prev) => [...prev, value]);
        } else {
            setToppings((prev) => prev.filter((topping) => topping !== value));
        }
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name.length < 3) {
            alert("İsim en az 3 karakter olmalıdır.");
            return;
        }
        if (toppings.length < 4 && toppings.length > 10) {
            alert("En az 4 malzeme seçmelisiniz. En fazla 10 malzeme seçmelisiniz.");
            return;
        }
        const payLoad = {
            boyut: pizzaSize,
            kalınlık: crustSize,
            malzemeler: toppings,
            isim: name
        }
        axios.post("https://reqres.in/api/pizza", payLoad)
            .then((response) => {
                console.log("sipariş özet: ", response.data)
                    .catch(error => {
                        console.log("sipariş hatası: ", error)
                    })
            })
    }
    const calculateTotal = () => {
        const basePrice = 85.50;
        const toppingPrice = toppings.length * 5;
        const newTotal = basePrice + toppingPrice;
        setTotalPrice(newTotal * quantity);
    };

    return (
        <form onSubmit={handleSubmit}>
            <header>
                <h1>Teknolojik Yemekler</h1>
                <p>Anasayfa-Sipariş Oluştur</p>
            </header>
            <section className="form-section">
                <div className="pizza-info">
                    <h2 className="pizza-title">Position Absolute Acı Pizza</h2>
                    <div className="pizza-price-rate">
                        <p className="pizza-price">85.50₺</p>
                        <div className="pizza-rate">
                            <p>4.9</p>
                            <p>(200)</p>
                        </div>
                    </div>
                    <p>Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.</p>
                </div>
                <div className="boyut-hamur-sec">
                    <div className="boyut-sec">
                        <h2>Boyut Seç</h2>
                        <input
                            type="radio"
                            id="option1"
                            name="pizzaSize"
                            value="Küçük"
                            onChange={handleSizeChange}
                        />
                        <label htmlFor="option1">Küçük</label>
                        <input
                            type="radio"
                            id="option2"
                            name="pizzaSize"
                            value="Orta"
                            onChange={handleSizeChange}
                        />
                        <label htmlFor="option2">Orta</label>
                        <input
                            type="radio"
                            id="option3"
                            name="pizzaSize"
                            value="Büyük"
                            onChange={handleSizeChange}
                        />
                        <label htmlFor="option3">Büyük</label>
                    </div>
                    <div className="hamur-sec">
                        <h2>Hamur Seç</h2>
                        <select name="hamur" id="hamur" onChange={handleCrustChange}>
                            <option value="">Hamur kalınlığı</option>
                            <option value="20">İnce</option>
                            <option value="30">Normal</option>
                            <option value="40">Kalın</option>
                        </select>
                    </div>
                </div>
                <div>
                    <h2>Ek Malzemeler</h2>
                    <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
                    <form>
                        {toppingsList.map((topping) => (
                            <div key={topping.id}>
                                <input
                                    type="checkbox"
                                    id={topping.id}
                                    value={topping.name}
                                    onChange={handleToppingChange}
                                />
                                <label htmlFor={topping.id}>{topping.name}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div>
                    <h2>İsim</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="İsminizi girin"
                        required
                        minLength="3"
                    />
                </div>
                <div>
                    <h2>Sipariş Notu</h2>
                    <textarea
                        id="w3review"
                        name="w3review"
                        rows="4"
                        cols="50"
                        placeholder="Siparişine eklemek istediğin bir not var mı?"
                    />
                </div>
                <div className="counter">
                    <ButtonGroup>
                        <button type='button' onClick={() => handleQuantityChange(-1)}>-</button>
                        <p>{quantity}</p>
                        <button type='button' onClick={() => handleQuantityChange(1)}>+</button>
                    </ButtonGroup>

                </div>
                <div className="siparis-card">
                    <h2>Sipariş Toplamı</h2>
                    <div>
                        <p>Seçimler</p>
                        <p>{(toppings.length * 5 * quantity).toFixed(2)}₺</p>
                    </div>
                    <div>
                        <p>Toplam</p>
                        <p>{totalPrice.toFixed(2)}₺</p>
                    </div>
                    <button type="submit">SİPARİŞ VER</button>
                </div>
            </section>
        </form>
    );
}
