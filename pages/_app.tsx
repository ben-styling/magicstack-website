import '../styles/global.scss'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })


const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <style jsx global>{`
                @font-face {
                    font-family: 'FuturaPT';
                    src: url(/fonts/FuturaPTBook.woff2) format('woff2');
                    font-weight: 400;
                    font-style: normal;
                    font-display: fallback;
                }
                @font-face {
                    font-family: 'FuturaPT';
                    src: url('/fonts/FuturaPTBookOblique.woff2')
                        format('woff2');
                    font-weight: 400;
                    font-style: italic;
                    font-display: fallback;
                }
                @font-face {
                    font-family: 'FuturaPT';
                    src: url('/fonts/FuturaPTMedium.woff2')
                        format('woff2');
                    font-weight: 500;
                    font-style: normal;
                    font-display: fallback;
                }
                @font-face {
                    font-family: 'FuturaPT';
                    src: url('/fonts/FuturaPTHeavy.woff2')
                        format('woff2');
                    font-weight: 600;
                    font-style: normal;
                    font-display: fallback;
                }
            `}</style>
            <TinaEditProvider
                editMode={
                    <TinaCMS
                        clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID}
                        branch={process.env.NEXT_PUBLIC_EDIT_BRANCH}
                        organization={process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
                        isLocalClient={Boolean(
                            Number(process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT ?? true)
                        )}
                        {...pageProps}
                    >
                        {(livePageProps: any) => <Component {...livePageProps} />}
                    </TinaCMS>
                }
            >
                <Component {...pageProps} />
            </TinaEditProvider>
        </>
    )
}

export default App
