/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
    render() {
        const {siteConfig, language = ''} = this.props;
        const {baseUrl, docsUrl} = siteConfig;
        const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
        const langPart = `${language ? `${language}/` : ''}`;
        const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

        const SplashContainer = props => (
            <div className="homeContainer">
                <div className="homeSplashFade">
                    <div className="wrapper homeWrapper">{props.children}</div>
                </div>
            </div>
        );

        const Logo = props => (
            <div className="projectLogo" style={{
                position: 'inherit',
                justifyContent: 'center',
                padding: 0
            }}>
                <img src={props.img_src} alt="Project Logo" />
            </div>
        );

        const ProjectTitle = () => (
            <h2 className="projectTitle">
                {siteConfig.title}
                <small>{siteConfig.tagline}</small>
            </h2>
        );

        const PromoSection = props => (
            <div className="section promoSection">
                <div className="promoRow">
                    <div className="pluginRowBlock">{props.children}</div>
                </div>
            </div>
        );

        const Button = props => (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={props.href} target={props.target}>
                    {props.children}
                </a>
            </div>
        );

        return (
            <SplashContainer>
                <Logo img_src={`${baseUrl}img/ethvtx.svg`} />
                <div className="inner">
                    <ProjectTitle siteConfig={siteConfig} />
                    <PromoSection>
                        <Button href="https://github.com/ticket721/ethvtx">Try It Out</Button>
                        <Button href="https://github.com/ticket721/ethvtx/tree/develop/examples">React Demo</Button>
                        <Button href="https://github.com/ticket721/ethvtx_embark">Embark Demo</Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const {config: siteConfig, language = ''} = this.props;
        const {baseUrl} = siteConfig;

        const Block = props => (
            <Container
                padding={['bottom', 'top']}
                id={props.id}
                background={props.background}>
                <GridBlock
                    align="center"
                    contents={props.children}
                    layout={props.layout}
                />
            </Container>
        );

        const FeatureCallout = () => (
            <div
                className="productShowcaseSection paddingBottom"
                style={{textAlign: 'center'}}>
                <h2>For Javascript & Typescript</h2>
                <MarkdownBlock>Complete typings available for our Typescript and TSX users ❤️️</MarkdownBlock>
            </div>
        );

        const Features = () => (
            <Block layout="fourColumn" style={{
                paddingTop: 0
            }}>
                {[
                    {
                        content: 'Data is only fetched when we are sure it needs an update. No superfluous calls are made.',
                        image: `${baseUrl}img/fan.svg`,
                        imageAlign: 'top',
                        title: 'Smart Data Refresh',
                    },
                    {
                        content: 'Easily set it up in your dapp. Any redux users will find this library very easy to use. It will save hours of development by providing all the needed tools for your dapp to work properly.',
                        image: `${baseUrl}img/ethereum.svg`,
                        imageAlign: 'top',
                        title: 'Ethereum Ready',
                    },
                ]}
            </Block>
        );

        return (
            <div>
                <HomeSplash siteConfig={siteConfig} language={language} />
                <div className="mainContainer" style={{
                    paddingTop: 0
                }}>
                    <Features />
                    <FeatureCallout />
                </div>
            </div>
        );
    }
}

module.exports = Index;
