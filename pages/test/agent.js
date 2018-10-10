/* eslint no-console: 0, react/no-danger: 0 */


import {UserAgent} from "@quentin-sommer/react-useragent";
import ConsumerPage from "../../components/consumer/layout/ConsumerPage.bs";

export default () => (
    <ConsumerPage>
        <UserAgent computer><p> This will only be rendered on desktop </p></UserAgent>
        <UserAgent mobile><p> This will only be rendered on mobile </p></UserAgent>
    </ConsumerPage>
);
