import Head from "next/head";
import styled from "styled-components";

const HeaderWrapper = styled.div`
    background-color: orange;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

const Title = styled.h1`
    height: 64px;
    pointer-events: none;
`;

function Header() {
    return (
        <>
            <Head>
                <title>Community Feed</title>
                <mata name="Description" content="This is a Community Feed project build with React and Next.js" />
            </Head>
            <HeaderWrapper>
                <Title>Community Feed</Title>
            </HeaderWrapper>
        </>
    );
}

export default Header;