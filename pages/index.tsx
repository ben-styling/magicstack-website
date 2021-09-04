import Head from 'next/head'
import Hero from '../assets/hero.svg'
import Text from '../components/Text'
import React from 'react'
import Header from '../components/Header'
import Develop from '../assets/develop.svg'
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
import { GetStaticProps } from 'next'


import { getStaticPropsForTina } from 'tinacms'


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

const content = {
    title: 'title',
    seoTitle: 'seoTitle',
    siteName: 'siteName',
    seoDescription: 'seoDescription',
    description: 'description',
    getStartedLink: 'getStartedLink',
    featuresTitle: 'featuresTitle',
    featuresDescription: 'featuresDescription',
    featureList: [
        {
            title: 'title',
            description: 'description',
            link: 'link',
        }
    ],
    featuresLink: 'featuresLink',
    featuresLinkText: 'featuresLinkText',
    section1: {
        title: 'title',
        description: 'description',
    },
    section2: {
        title: 'title',
        description: 'description',
    },
    installLink: 'installLink',
    githubLink: 'githubLink',
}

const globalContent = {
    siteName: 'siteName',
    getStartedLink: 'getStartedLink',
    githubLink: 'githubLink',
    installLink: 'installLink',
}

export default function Home({ data }) {
    console.log({ data })
    // console.log({'title': data.getFeatureDocument.data.title})
    // console.log({'title': data.getFeatureDocument.data.title})
    // console.log({'shortDescription':data.getFeatureDocument.data.shortDescription})
    return (
        <>
            <Head>
                <title>
                    {content.seoTitle ?? globalContent.siteName
                        ? globalContent.siteName
                        : 'magicSTACK | Configure less'}
                </title>
                <meta
                    name="description"
                    content={
                        content.seoDescription ??
                        'Restarting PHP is a thing of the past with multi-PHP versions. Find bliss with a pre-configured development environment, automatic DNS resolution, ssl certificates, aliases and much more!'
                    }
                />
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
                        {content.featuresLink && content.featuresLinkText ? (
                            <a
                                className="like-magic__link"
                                href={content.featuresLink}>
                                {content.featuresLinkText}
                            </a>
                        ) : null}
                    </div>
                </section>

                <section className="container section">
                    <div className="grid--2x2">
                        <div>
                            <h2>
                                {content.section1.title
                                    ?.split?.('\n')
                                    ?.map?.((item: string, index: number) => (
                                        <React.Fragment key={index}>
                                            {item}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </h2>
                            <div className="is-large">
                                <ReactMarkdown
                                    source={content.section1.description}
                                />
                            </div>
                        </div>
                        <div>
                            <Develop />
                        </div>
                    </div>
                </section>

                <section className="container section">
                    <div className="grid--2x2">
                        <h2>
                            {content.section2?.title
                                ?.split?.('\n')
                                ?.map?.((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                        {item}
                                        <br />
                                    </React.Fragment>
                                ))}
                        </h2>
                        <div className="center-h">
                            <p className="is-large nobr">
                                {content.section2?.description
                                    ?.split?.('\n')
                                    ?.map?.((item: string, index: number) => (
                                        <React.Fragment key={index}>
                                            {item}
                                            <br />
                                        </React.Fragment>
                                    ))}
                            </p>
                            <div className="buttonGroup">
                                <a
                                    href={globalContent.installLink}
                                    className="button button--red">
                                    Install now
                                </a>
                                <a
                                    href={globalContent.githubLink}
                                    className="button button--outline-black">
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}



export const getStaticProps: GetStaticProps = async (props) => {

    console.log({ props })

    const tinaProps = await getStaticPropsForTina({
        query: `
            query GetHomePage {
                getHomeDocument(relativePath: "index.json") {
                    data {
                        title
                        description
                        featureList {
                            title
                            description
                            icon
                        }
                        section1 {
                            title
                            description
                        }
                        section2 {
                            title
                            description
                        }
                        featuresTitle
                        featuresDescription
                        featuresLinkText
                        featuresLink
                        seoTitle
                        seoDescription
                    }
                }
            }
        `
    })

    return {
        props: {
            ...tinaProps,
        }
    }
}


// export const getStaticProps: GetStaticProps = async function ({
//     preview,
//     previewData,
// }) {
//     if (preview) {
//         return {
//             props: {
//                 error: null,
//                 preview: true,
//                 homeFile: (
//                     await getGithubPreviewProps({
//                         ...previewData,
//                         fileRelativePath: 'content/home.json',
//                         parse: parseJson,
//                         head_branch: 'main',
//                     })
//                 ).props.file,
//                 globalFile: (
//                     await getGithubPreviewProps({
//                         ...previewData,
//                         fileRelativePath: 'content/global.json',
//                         parse: parseJson,
//                         head_branch: 'main',
//                     })
//                 ).props.file,
//             },
//         }
//     }
//     return {
//         props: {
//             sourceProvider: null,
//             error: null,
//             preview: false,
//             homeFile: {
//                 fileRelativePath: 'content/home.json',
//                 data: (await import('../content/home.json')).default,
//             },
//             globalFile: {
//                 fileRelativePath: 'content/global.json',
//                 data: (await import('../content/global.json')).default,
//             },
//         },
//     }
// }
