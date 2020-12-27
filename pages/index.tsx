import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../assets/hero.svg'
import Develop from '../assets/develop.svg'
import dynamic from 'next/dynamic'
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'

import { usePlugin } from 'tinacms'
import {
    useGithubJsonForm,
    useGithubToolbarPlugins,
} from 'react-tinacms-github'
import Text from '../components/Text'
import Head from 'next/head'

const renderFeatureCard = (f: any, index: number) => {
    const Icon = dynamic(
        () => import(`../assets/icons/${f?.icon || 'terminal'}.svg`),
    )
    return (
        <div key={f?.title || index} className="featureCardContainer">
            <div className="featureCard">
                <div className="featureCard__icon">
                    <Icon />
                </div>
                <div className="featureCard__content">
                    <h2>{f?.title}</h2>
                    <p>{f?.description}</p>
                    {f?.link ? <a href={f?.link}>Learn more &gt;</a> : null}
                </div>
            </div>
        </div>
    )
}

const fields = [
    { name: 'title', component: 'text' },
    { name: 'description', component: 'textarea' },
    {
        name: 'featuresTitle',
        component: 'textarea',
        description:
            'line breaks will be entered on desktop and removed at mobile.',
    },
    { name: 'featuresDescription', component: 'text' },
    {
        name: 'featureList',
        component: 'group-list',
        fields: [
            {
                name: 'icon',
                component: 'select',
                options: [
                    {
                        label: 'server',
                        value: 'server',
                    },
                    {
                        label: 'serverCluster',
                        value: 'serverCluster',
                    },
                    {
                        label: 'versions',
                        value: 'versions',
                    },
                    {
                        label: 'terminal',
                        value: 'terminal',
                    },
                ],
            },
            {
                name: 'title',
                component: 'text',
            },
            {
                name: 'description',
                component: 'textarea',
            },
            {
                name: 'link',
                component: 'text',
            },
        ],
    },
]

export default function Home({ homeFile, globalFile, cms }: any) {
    const homeFormOptions = {
        label: 'Home Page',
        fields,
    }
    const globalFormOptions = {
        label: 'Global',
        fields: [
            { name: 'siteName', component: 'text' },
            { name: 'githubLink', component: 'text' },
            { name: 'docsLink', component: 'text' },
            { name: 'getStartedLink', component: 'text' },
        ],
    }
    const [content, contentForm] = useGithubJsonForm(homeFile, homeFormOptions)
    const [globalContent, globalContentForm] = useGithubJsonForm(
        globalFile,
        globalFormOptions,
    )
    usePlugin(contentForm)
    usePlugin(globalContentForm)
    useGithubToolbarPlugins()

    return (
        <>
            <Head>
                <title>
                    {globalContent.siteName
                        ? globalContent.siteName
                        : 'magicSTACK | Configure less'}
                </title>
            </Head>
            <Header />

            <div className="site">
                <section className="container">
                    <div className="hero">
                        <div>
                            <h1>{content?.title}</h1>
                            <Text className="is-large">
                                {content.description}
                            </Text>
                            <div className="buttonGroup">
                                <a
                                    className="button button--red"
                                    href={
                                        globalContent.getStartedLink ??
                                        `https://magicstack.app/get-started`
                                    }>
                                    Get started
                                </a>
                                <a
                                    className="button button--outline-black"
                                    href={
                                        globalContent.githubLink ??
                                        `https://github.com/chrisnharvey/magicstack`
                                    }>
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                        <div>
                            <Hero className="heroSvg" />
                        </div>
                    </div>
                </section>

                <section className="like-magic">
                    <div className="container">
                        <h2 className="nobr">
                            {content.featuresTitle
                                ?.split?.('\n')
                                ?.map?.((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                ))}
                        </h2>
                        <p className="is-large">
                            {content.featuresDescription}
                        </p>

                        <div className="featureCardGrid">
                            {content.featureList?.map?.(renderFeatureCard)}
                        </div>
                        <a
                            className="like-magic__link"
                            href="https://magicstack.app">
                            And that's just the start... Read the full docs
                        </a>
                    </div>
                </section>

                <section className="container section">
                    <div className="grid--2x2">
                        <div>
                            <h2>
                                Develop more, <br />
                                Configure less
                            </h2>
                            <p className="is-large">
                                Install within minutes, and get going FAST. Easy
                                to setup multiple machines and have everyone on
                                the same page. Compatible with Linux, Windows*,
                                and macOS.
                                <br />
                                <small>
                                    *Works best on windows with WSL 2.
                                </small>
                            </p>
                        </div>
                        <div>
                            <Develop></Develop>
                        </div>
                    </div>
                </section>

                <section className="container section">
                    <div className="grid--2x2">
                        <h2>
                            Experience zero <br />
                            config bliss
                        </h2>
                        <div className="center-h">
                            <p className="is-large nobr">
                                magicSTACK has everything you need <br /> for
                                modern web development.
                            </p>
                            <div className="buttonGroup">
                                <a href="#" className="button button--red">
                                    Install now
                                </a>
                                <a
                                    href="#"
                                    className="button button--outline-black">
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer cms={cms} />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async function ({
    preview,
    previewData,
}) {
    if (preview) {
        return {
            props: {
                error: null,
                preview: true,
                homeFile: (
                    await getGithubPreviewProps({
                        ...previewData,
                        fileRelativePath: 'content/home.json',
                        parse: parseJson,
                        head_branch: 'main',
                    })
                ).props.file,
                globalFile: (
                    await getGithubPreviewProps({
                        ...previewData,
                        fileRelativePath: 'content/global.json',
                        parse: parseJson,
                        head_branch: 'main',
                    })
                ).props.file,
            },
        }
    }
    return {
        props: {
            sourceProvider: null,
            error: null,
            preview: false,
            homeFile: {
                fileRelativePath: 'content/home.json',
                data: (await import('../content/home.json')).default,
            },
            globalFile: {
                fileRelativePath: 'content/global.json',
                data: (await import('../content/global.json')).default,
            },
        },
    }
}
