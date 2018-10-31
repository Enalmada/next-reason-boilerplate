import React from "react";
import AntdMobileExamples from "../../components/consumer/mobile/AntdMobileExamples.bs";


export default class extends React.Component {
    static async getInitialProps({query}) {
        const which = query.slug;
        return {which};
    }

    render() {
        return (
            <AntdMobileExamples which={this.props.which}/>
        );
    }
}
