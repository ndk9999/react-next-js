import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import FormItem from "../components/FormItem";
import NavBar from "../components/NavBar";
import ItemsContext from "../context/ItemsContext";

const FormWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 2% 3%;
`;

const SubmitButton = styled(Button)`
    background: blue;
    margin: 2% 0;
`;

function ListForm() {
    let navigate = useNavigate();
    const {listId} = useParams();

    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const { addItem } = useContext(ItemsContext);

    function onFormSubmit(e) {
        e.preventDefault();
        
        if (title && quantity && price) {
            addItem({
                title,
                quantity,
                price,
                listId
            })
        }

        navigate(`/list/${listId}`);
    }

    return (
        <>
            {navigate && <NavBar goBack={() => navigate(-1)} title="Add Item" />}

            <FormWrapper>
                <form onSubmit={onFormSubmit}>
                    <FormItem
                        id="title"
                        label="Title"
                        placeholder="Insert title"
                        value={title}
                        handleOnChange={(e) => setTitle(e.currentTarget.value)}
                    />
                    <FormItem 
                        id="quantity"
                        label="Quantity"
                        type="number"
                        placeholder="0"
                        value={quantity}
                        handleOnChange={(e) => setQuantity(e.currentTarget.value)}
                    />
                    <FormItem 
                        id="price"
                        label="Price"
                        type="number"
                        placeholder="0.00"
                        value={price}
                        handleOnChange={(e) => setPrice(e.currentTarget.value)}
                    />
                    <SubmitButton>Add Item</SubmitButton>
                </form>
            </FormWrapper>
        </>
    );
}

export default ListForm;