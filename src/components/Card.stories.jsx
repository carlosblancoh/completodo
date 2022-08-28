import React from 'react';
import Card from './Card';
import Icon from './Icon';


export default {
    title: 'Components/Card',
    component: Card,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const Template = (args) => <Card {...args} />;
export const emptyPlain = Template.bind({});
emptyPlain.args = {
    variant: 'plain',
};
export const emptyGlass = Template.bind({});
emptyGlass.args = {
    variant: 'glass',
};

export const full = (args) => (
    <Card {...args}>
        <Card.Header>
            <Card.Header.Left>
                <Icon name='check_box'/>
            </Card.Header.Left>
            <Card.Header.Title
                title='Titulo'
                subtitle='Subtitulo'
            />
            <Card.Header.Right>
                <Icon name='close'/>
            </Card.Header.Right>
        </Card.Header>
        <Card.Body>
            <Card variant='plain'/>
        </Card.Body>
    </Card>
);
full.args = {
    variant: 'glass',
};

export const stackedInsideCard = (args) => (
    <Card {...args}>
        <Card.Header>
            <Card.Header.Title
                title='Hoy, 8 de Abril'
            />
        </Card.Header>
        <Card.Body>
            <Card color='#53d769'>
                <Card.Header>
                    <Card.Header.Title
                        title='Titulo'
                        subtitle='Subtitulo'
                    />
                    <Card.Header.Right>
                        <p>16:00 - 18:00</p>
                    </Card.Header.Right>
                    <Card.Header.Right>
                        <Icon name='expand_less'/>
                    </Card.Header.Right>
                </Card.Header>
                <Card.Body>
                    <Card variant='plain' stackable>
                        <Card.Header>
                            <Card.Header.Left>
                                <Icon name='check_box'/>
                            </Card.Header.Left>
                            <Card.Header.Title
                                title='Titulo'
                                subtitle='Subtitulo'
                            />
                            <Card.Header.Right>
                                <Icon name='close'/>
                            </Card.Header.Right>
                        </Card.Header>
                    </Card>
                    <Card variant='plain' stackable>
                        <Card.Header>
                            <Card.Header.Left>
                                <Icon name='check_box'/>
                            </Card.Header.Left>
                            <Card.Header.Title
                                title='Titulo'
                                subtitle='Subtitulo'
                            />
                            <Card.Header.Right>
                                <Icon name='close'/>
                            </Card.Header.Right>
                        </Card.Header>
                    </Card>
                    <Card variant='plain' stackable>
                        <Card.Header>
                            <Card.Header.Left>
                                <Icon name='check_box'/>
                            </Card.Header.Left>
                            <Card.Header.Title
                                title='Titulo'
                                subtitle='Subtitulo'
                            />
                            <Card.Header.Right>
                                <Icon name='close'/>
                            </Card.Header.Right>
                        </Card.Header>
                    </Card>
                </Card.Body>
            </Card>
            <Card variant='plain'>
                <Card.Header>
                    <Card.Header.Left>
                        <Icon name='check_box'/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title='Titulo'
                        subtitle='Subtitulo'
                    />
                    <Card.Header.Right>
                        <p>18:10</p>
                    </Card.Header.Right>
                    <Card.Header.Right>
                        <Icon name='close'/>
                    </Card.Header.Right>
                </Card.Header>
            </Card>
            <Card color='#fd9426'>
                <Card.Header>
                    <Card.Header.Title
                        title='Titulo'
                        subtitle='Subtitulo'
                    />
                    <Card.Header.Right>
                        <p>19:00 - 20:00</p>
                    </Card.Header.Right>
                    <Card.Header.Right>
                        <Icon name='expand_more'/>
                    </Card.Header.Right>
                </Card.Header>
            </Card>
            <Card variant='plain' stackable>
                <Card.Header>
                    <Card.Header.Left>
                        <Icon name='check_box'/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title='Titulo'
                        subtitle='Subtitulo'
                    />
                    <Card.Header.Right>
                        <Icon name='close'/>
                    </Card.Header.Right>
                </Card.Header>
            </Card>
            <Card variant='plain' stackable>
                <Card.Header>
                    <Card.Header.Left>
                        <Icon name='check_box'/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title='Titulo'
                        subtitle='Subtitulo'
                    />
                    <Card.Header.Right>
                        <Icon name='close'/>
                    </Card.Header.Right>
                </Card.Header>
            </Card>
        </Card.Body>
    </Card>
);
stackedInsideCard.args = {
    variant: 'glass',
};


export const stack = (args) => (
    <>
        <Card {...args}>
            <Card.Header>
                <Card.Header.Left>
                    <Icon name='check_box'/>
                </Card.Header.Left>
                <Card.Header.Title
                    title='Titulo'
                    subtitle='Subtitulo'
                />
                <Card.Header.Right>
                    <Icon name='close'/>
                </Card.Header.Right>
            </Card.Header>
        </Card>
        <Card variant='plain' stackable>
            <Card.Header>
                <Card.Header.Left>
                    <Icon name='check_box'/>
                </Card.Header.Left>
                <Card.Header.Title
                    title='Titulo'
                    subtitle='Subtitulo'
                />
                <Card.Header.Right>
                    <Icon name='close'/>
                </Card.Header.Right>
            </Card.Header>
        </Card>
        <Card variant='plain' stackable>
            <Card.Header>
                <Card.Header.Left>
                    <Icon name='check_box'/>
                </Card.Header.Left>
                <Card.Header.Title
                    title='Titulo'
                    subtitle='Subtitulo'
                />
                <Card.Header.Right>
                    <Icon name='close'/>
                </Card.Header.Right>
            </Card.Header>
        </Card>
    </>
);
stack.args = {
    variant: 'plain',
    stackable: true,
};
