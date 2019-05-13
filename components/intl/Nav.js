import React from "react";
import {FormattedMessage} from "@4c/react-intl";
import Link from "next/link";

export default () => (
    <nav>
        <li>
            <Link href="/intl">
                <a><FormattedMessage id="nav.home" defaultMessage="Home" /></a>
            </Link>
        </li>
        <li>
            <Link href="/intl/about">
                <a><FormattedMessage id="nav.about" defaultMessage="About" /></a>
            </Link>
        </li>

        <style jsx>{`
      nav {
        display: flex;
      }
      li {
        list-style: none;
        margin-right: 1rem;
      }
    `}</style>
    </nav>
);
