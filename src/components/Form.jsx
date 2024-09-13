import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Input, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function Form() {
    const [pizzaSize, setPizzaSize] = useState('');
    const [crustSize, setCrustSize] = useState('');
    const [toppings, setToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(85.50);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [toppingsError, setToppingsError] = useState('');
    const history = useHistory();

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

        let updatedToppings;
        if (checked) {
            updatedToppings = [...toppings, value];
        } else {
            updatedToppings = toppings.filter((topping) => topping !== value);
        }


        if (updatedToppings.length < 4) {
            setToppingsError("En az 4 malzeme seçmelisiniz.");
        } else if (updatedToppings.length > 10) {
            setToppingsError("En fazla 10 malzeme seçebilirsiniz.");
        } else {
            setToppingsError('');
        }

        setToppings(updatedToppings);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value.length < 3) {
            setNameError("İsim en az 3 karakter olmalıdır.");
        } else {
            setNameError('');
        }
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;


        if (name.length < 3) {
            setNameError("İsim en az 3 karakter olmalıdır.");
            isValid = false;
        } else {
            setNameError('');
        }


        if (toppings.length < 4 || toppings.length > 10) {
            setToppingsError("En az 4, en fazla 10 malzeme seçmelisiniz.");
            isValid = false;
        } else {
            setToppingsError('');
        }


        if (!isValid) return;

        const payLoad = {
            boyut: pizzaSize,
            kalınlık: crustSize,
            malzemeler: toppings,
            isim: name
        }
        axios.post("https://reqres.in/api/pizza", payLoad)
            .then((response) => {
                history.push("/success")
                console.log("sipariş özet: ", response.data)
            })
            .catch(error => {
                console.log("sipariş hatası: ", error)
            });
    }
    const calculateTotal = () => {
        const basePrice = 85.50;
        const toppingPrice = toppings.length * 5;
        const newTotal = basePrice + toppingPrice;
        setTotalPrice(newTotal * quantity);
    };

    const isFormValid = name.length >= 3 && toppings.length >= 4 && toppings.length <= 10;

    return (
        <form onSubmit={handleSubmit}>
            <header>
                <h1>Teknolojik Yemekler</h1>
                <p>Anasayfa-<span>Sipariş Oluştur</span></p>
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
                        <h3>Boyut Seç</h3>
                        <div className='boyut-sec-ratio'>
                            <Input
                                type="radio"
                                id="option1"
                                name="pizzaSize"
                                value="Küçük"
                                onChange={handleSizeChange}
                            />
                            <Label htmlFor="option1">Küçük</Label>
                        </div>
                        <div className='boyut-sec-ratio'>
                            <Input
                                type="radio"
                                id="option2"
                                name="pizzaSize"
                                value="Orta"
                                onChange={handleSizeChange}
                            />
                            <Label htmlFor="option2">Orta</Label>
                        </div>
                        <div className='boyut-sec-ratio'>
                            <Input
                                type="radio"
                                id="option3"
                                name="pizzaSize"
                                value="Büyük"
                                onChange={handleSizeChange}
                            />
                            <Label htmlFor="option3">Büyük</Label>
                        </div>
                    </div>
                    <div className="hamur-sec">
                        <h3>Hamur Seç</h3>
                        <select name="hamur" id="hamur" onChange={handleCrustChange}>
                            <option value="">Hamur kalınlığı</option>
                            <option value="ince">İnce</option>
                            <option value="normal">Normal</option>
                            <option value="kalın">Kalın</option>
                        </select>
                    </div>
                </div>
                <div className='ekmalzemeler'>
                    <h3>Ek Malzemeler</h3>
                    <p>En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
                    <div className='ekmalzemeler-container'>
                        <div className='ekmalzemeler-checkbox'>
                            {toppingsList.map((topping) => (
                                <div key={topping.id}>
                                    <Input
                                        type="checkbox"
                                        id={topping.id}
                                        value={topping.name}
                                        onChange={handleToppingChange}
                                    />
                                    <Label htmlFor={topping.id}>{topping.name}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {toppingsError && <p style={{ color: 'red', fontSize: '14px' }}>{toppingsError}</p>}
                </div>
                <div>
                    <h3>İsim</h3>
                    <Input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="İsminizi girin"
                        required
                        minLength="3"
                    />
                    {nameError && <p style={{ color: 'red', fontSize: '14px' }}>{nameError}</p>}
                </div>
                <div>
                    <h3>Sipariş Notu</h3>
                    <div>
                        <Input
                            type='textarea'
                            id="w3review"
                            name="w3review"
                            rows="4"
                            cols="50"
                            placeholder="Siparişine eklemek istediğin bir not var mı?"
                        />
                    </div>
                </div>
                <div className='sipars-container'>
                    <div className="counter">
                        <ButtonGroup className='buttons'>
                            <Button type='button' onClick={() => handleQuantityChange(-1)}>-</Button>
                            <p>{quantity}</p>
                            <Button type='button' onClick={() => handleQuantityChange(1)}>+</Button>
                        </ButtonGroup>

                    </div>
                    <div className="siparis-card">
                        <div className="siparis-card-secimler-toplam">
                            <h3>Sipariş Toplamı</h3>
                            <div className="siparis-card-secimler">
                                <p>Seçimler</p>
                                <p>{(toppings.length * 5 * quantity).toFixed(2)}₺</p>
                            </div>
                            <div className="siparis-card-toplam">
                                <p>Toplam</p>
                                <p>{totalPrice.toFixed(2)}₺</p>
                            </div>
                        </div>
                        <Button type="submit" disabled={!isFormValid} onClick={handleSubmit}>SİPARİŞ VER</Button>
                    </div>
                </div>
            </section>
        </form>
    );
}
