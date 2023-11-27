import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card";

const QuestionDetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;

function QuestionDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState({});

    useEffect(() => {
        async function fetchQuestion() {
            const response = await fetch(`https://api.stackexchange.com/2.2/questions/${id}?site=stackoverflow`);
            const result = await response.json();

            if (result) {
                setQuestion(result.items[0]);
                setLoading(false);
            }
        }

        id && fetchQuestion();
    }, [ id ]);

    return (
        <>
            <Head>
                <title>Question: {question.title}</title>
            </Head>
            <QuestionDetailContainer>
                <h2>Question: {id}</h2>
                {
                    loading ? (
                        <span>Loading ...</span>
                    ) : (
                        <Card 
                            title={question.title}
                            views={question.view_count}
                            answers={question.answer_count}
                        />
                    )
                }
            </QuestionDetailContainer>
        </>
    );
}

export default QuestionDetail;