import React from 'react'
import MvFaqs from '../components/MvFaqs'
import { TFaq } from '../types'



import {FAQs} from '../content'
import { Layout } from '../components/MvLayout'
export default function faqs() {
    return (
        <Layout >
            <MvFaqs faqs={FAQs}/>
            </Layout>
    )
}
