import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import NavBar from "../components/NavBar";
import ItemsContext from "../context/ItemsContext";
import ListsContext from "../context/ListsContext";
// import useDataFetching from "../hooks/useDataFetching";

const ListItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 2% 3%;
`;

function ListDetail() {
    let navigate = useNavigate();
    const { listId } = useParams();
    const { loading, error, items, fetchItems } = useContext(ItemsContext);
    const { list, fetchList } = useContext(ListsContext);

    useEffect(() => {
        console.log(listId, items.length);
        listId && fetchItems(listId);
    }, [fetchItems, items.length, listId]);

    useEffect(() => {
        console.log(listId);
        listId && fetchList(listId);
    }, [fetchList, listId]);

    // const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/items/');
    // useEffect(() => {
    //     data && listId && setItems(data.filter((x) => x.listId === parseInt(listId)));
    // }, [data, listId]);

    return (
        <>
            {navigate && (
                <NavBar
                    goBack={() => navigate(-1)}
                    openForm={() => navigate(`/list/${listId}/new`)}
                    title={list && list.title}
                />
            )}

            <ListItemWrapper>
                {loading || error ? (
                    <span>{error || 'Loading ...'}</span>
                ) : (
                    items.map((x) => <ListItem key={x.id} data={x} />)
                )}
            </ListItemWrapper>
        </>
    );
}

export default ListDetail;