import Head from "next/head";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";

const QuestionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin: 5%;
`;


function Questions({questions, hasMore, page}) {
    // const [loading, setLoading] = useState(true);
    // const [questions, setQuestions] = useState([]);
    // const [hasMore, setHasMore] = useState(false);

    // const router = useRouter();
    // const { page } = router.query;

    // useEffect(() => {
    //     async function fetchQuestions() {
    //         const response = await fetch(`https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow${page ? `&page=${page}` : ''}`);
    //         const result = await response.json();

    //         if (result) {
    //             setQuestions(result.items);
    //             setHasMore(result.has_more);
    //             setLoading(false);
    //         }
    //     }

    //     fetchQuestions();
    // }, [page]);
    
    return (
        <>
            <Head>
                <title>List of Questions</title>
            </Head>
            <QuestionsContainer>
                <h2>Questions</h2>
                {
                    // loading ? (
                    //     <span>Loading ...</span>
                    // ) : (
                        <>
                            <div>
                                {
                                    questions.map((q) => (
                                        <Link
                                            key={q.question_id}
                                            href={`/questions/${q.question_id}`}
                                            passHref
                                        >
                                            <Card 
                                                title={q.title}
                                                views={q.view_count}
                                                answers={q.answer_count}
                                            />
                                        </Link>
                                    ))
                                }
                            </div>
                            <Pagination 
                                currentPage={parseInt(page) || 1}
                                hasMore={hasMore}
                            />
                        </>
                    // )
                }
            </QuestionsContainer>
        </>
    );
}

export async function getServerSideProps(context) {
    const { page } = context.query;

    const response = await fetch(`https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&tagged=reactjs&site=stackoverflow${page ? `&page=${page}` : ''}`);
    const result = await response.json();

    return {
        props: {
            questions: result.items,
            hasMore: result.has_more,
            page: page || 1
        },
    };
}

export default Questions;