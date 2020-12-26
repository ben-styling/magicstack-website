import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Hero from '../assets/hero.svg'
import Develop from '../assets/develop.svg'
import { GrServer } from 'react-icons/gr'

import { getGithubPreviewProps, parseJson } from 'next-tinacms-github'
import { GetStaticProps } from 'next'

export default function Home({ file }: any) {
    const data = file?.data

    return (
        <>
            <Head>
                <title>magicSTACK | Configure less</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/urb2zft.css"
                />
            </Head>

            <Header />

            <div className="site">
                <section className="container">
                    <div className="hero">
                        <div>
                            <h1>
                                {data?.title}
                                The all in one solution for local development
                            </h1>
                            <p className="is-large">
                                Restarting PHP is a thing of the past with
                                multi-PHP versions.
                                <br />
                                Find bliss with a pre-configured development
                                environment, automatic DNS resolution, ssl
                                certificates, aliases and much more!
                            </p>
                            <div className="buttonGroup">
                                <a
                                    className="button button--red"
                                    href="https://magicstack.app/get-started">
                                    Get started
                                </a>
                                <a
                                    className="button button--outline-black"
                                    href="https://github.com/chrisnharvey/magicstack">
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
                            magicSTACK is a full stack <br />
                            web development environment
                        </h2>
                        <p className="is-large">
                            That works <em>like</em> magic.
                        </p>

                        <div className="featureCardGrid">
                            {[0, 1, 2, 3, 4, 5].map(i => {
                                return (
                                    <div
                                        key={i}
                                        className="featureCardContainer">
                                        <div className="featureCard">
                                            <div className="featureCard__icon">
                                                <GrServer />
                                            </div>
                                            <div className="featureCard__content">
                                                <h2>Auto DNS</h2>
                                                <p>
                                                    Creating a new project just
                                                    requires you to create a new
                                                    folder on the filesystem. No
                                                    more messing with your hosts
                                                    file every time.
                                                </p>
                                                <a href="#">Learn more &gt;</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
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

                <Footer />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async function ({
    preview,
    previewData,
}) {
    if (preview) {
        return getGithubPreviewProps({
            ...previewData,
            fileRelativePath: 'content/home.json',
            parse: parseJson,
        })
    }
    return {
        props: {
            sourceProvider: null,
            error: null,
            preview: false,
            file: {
                fileRelativePath: 'content/home.json',
                data: (await import('../content/home.json')).default,
            },
        },
    }
}
