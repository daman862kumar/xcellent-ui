import React from 'react';
import {storiesOf} from "@storybook/react";
import {Button} from "../components/index"

const stories = storiesOf('App', module)


const MyComponent = () => {
    return (
        <div>
            <Button>Hello1</Button>
        </div>
    );
};

stories.add('App', MyComponent)
