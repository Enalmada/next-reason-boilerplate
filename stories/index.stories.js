import React from "react";

import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {linkTo} from "@storybook/addon-links";

import {Welcome} from "@storybook/react/demo";
import Button from "../components/consumer/Button.bs";

storiesOf("Welcome", module).add("to Storybook", () => <Welcome showApp={linkTo("Button")} />);

storiesOf("Button", module)
    .add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
    .add("with some emoji", () => (
        <Button onClick={action("clicked")}>
            <span role="img" aria-label="so cool">
        😀 😎 👍 💯
            </span>
        </Button>
    ));
