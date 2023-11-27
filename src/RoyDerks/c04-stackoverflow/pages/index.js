import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Questions, { getServerSideProps as getServerSidePropsQuestions } from './questions'

export default function Home(props) {
  return (
    <Questions {...props} />
  )
}

export function getServerSideProps(context) {
  return getServerSidePropsQuestions(context);
}