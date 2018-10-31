import React from "react";
import MobileIframe from "../../components/consumer/mobile/MobileIframe.bs";


export default class extends React.Component {
    static async getInitialProps({query}) {
        const which = query.slug;
        return {which};
    }

    render() {
        return (
            <MobileIframe which={this.props.which}/>
        );
    }
}
