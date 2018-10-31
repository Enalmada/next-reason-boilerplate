import Link from "next/link";
import {withRouter} from "next/router";

// This is used to have links inside translation.  See this thread for more info:
// https://spectrum.chat/?t=b9d1b95e-177b-4447-8cd1-bf2f488e44d5
// USAGE:
// <CustomLink href={'/test'}>{t('translated_key')}</CustomLink>

const NextLink = ({href, children, className}) => (
    <Link href={href} passHref>
        <a className={className}>{children}</a>
    </Link>
);

export default withRouter(NextLink);
