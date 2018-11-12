import {Badge, Layout} from "antd";
import Link from 'next/link'

const divStyle = {
    marginRight: '20px'
};

const headerStyle = {
    display: 'flex'
};
const badgeStyle = {
    marginLeft: '25px'
};

export default ({children}) => (
    <Layout>
        <Layout.Header>
            <div style={headerStyle}>
                <Link href="/"><a style={divStyle}>Home</a></Link>
                <Link href="/flicker"><a style={divStyle}>Click To Flicker</a></Link>
                <div style={badgeStyle}><Badge count={5}> <a href="#" className="head-example"/> </Badge></div>
            </div>
        </Layout.Header>
        <Layout.Content> <div>{children}</div> </Layout.Content>
        <Layout.Footer>
        </Layout.Footer>
    </Layout>
);


