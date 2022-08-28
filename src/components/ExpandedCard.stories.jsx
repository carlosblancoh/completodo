import React from 'react';
import Attribute from './Attribute';
import Button from './Button';
import Card from './Card';
import ExpandedCard from './ExpandedCard';
import Icon from './Icon';
import TopBar from './TopBar';


export default {
    title: 'Components/ExpandedCard',
    component: ExpandedCard,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {

    },
};

const _Template = (args) => <ExpandedCard {...args} />;

export const ExpandedTask = (args) => (
    <ExpandedCard {...args}>
        <ExpandedCard.Top>
            <TopBar variant='noBackground'>
                <TopBar.Left>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <TopBar.Title
                    title='FolderName'
                    back
                />
                <TopBar.Right>
                    <Icon name='bookmark'/>
                </TopBar.Right>
                <TopBar.Right>
                    <Icon name='edit'/>
                </TopBar.Right>
            </TopBar>
        </ExpandedCard.Top>
        <ExpandedCard.Header>
            <ExpandedCard.Header.Left>
                <Icon name='check_box'/>
            </ExpandedCard.Header.Left>
            <ExpandedCard.Header.Title
                title='Título'
                subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis nec nisi eget porta. Fusce sollicitudin leo quis quam gravida semper. Ut egestas et diam sed pretium.'
            />
        </ExpandedCard.Header>
        <ExpandedCard.Body>
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
            <Card variant='plain' stackable>
                <Card.Middle>
                    <Icon name='add'/>
                </Card.Middle>
            </Card>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
        </ExpandedCard.Body>
        <ExpandedCard.Bottom>
            <Button
                icon= 'archive'
                text= 'Archivar'
            />
        </ExpandedCard.Bottom>
    </ExpandedCard>
);
ExpandedTask.args = {
    variant: 'plain',
};

export const EditTask = (args) => (
    <ExpandedCard {...args}>
        <ExpandedCard.Top>
            <TopBar variant='noBackground'>
                <TopBar.Title
                    title='Cancelar'
                />
                <TopBar.Right>
                    <Icon name='bookmark'/>
                </TopBar.Right>
                <TopBar.Right>
                    <Icon name='edit' fill/>
                </TopBar.Right>
            </TopBar>
        </ExpandedCard.Top>
        <ExpandedCard.Header>
            <ExpandedCard.Header.Left>
                <Icon name='check_box'/>
            </ExpandedCard.Header.Left>
            <ExpandedCard.Header.Title
                title='Título'
                subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis nec nisi eget porta. Fusce sollicitudin leo quis quam gravida semper. Ut egestas et diam sed pretium.'
            />
        </ExpandedCard.Header>
        <ExpandedCard.Body>
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
            <Card variant='plain' stackable>
                <Card.Middle>
                    <Icon name='add'/>
                </Card.Middle>
            </Card>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='add_circle' color='#007aff'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='add_circle' color='#007aff'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='add_circle' color='#007aff'/>
                </Attribute.Right>
            </Attribute>
        </ExpandedCard.Body>
        <ExpandedCard.Bottom>
            <Button
                icon= 'archive'
                text= 'Archivar'
            />
            <Button
                textColor='#ff3b30'
                icon= 'delete'
                text= 'Eliminar'
            />
        </ExpandedCard.Bottom>
    </ExpandedCard>
);
EditTask.args = {
    variant: 'plain',
};

export const ExpandedNote = (args) => (
    <ExpandedCard {...args}>
        <ExpandedCard.Top>
            <TopBar variant='noBackground'>
                <TopBar.Left>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <TopBar.Title
                    title='FolderName'
                    back
                />
                <TopBar.Right>
                    <Icon name='bookmark'/>
                </TopBar.Right>
                <TopBar.Right>
                    <Icon name='edit'/>
                </TopBar.Right>
            </TopBar>
        </ExpandedCard.Top>
        <ExpandedCard.Header>
            <ExpandedCard.Header.Title
                title='Título'
                subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis nec nisi eget porta. Fusce sollicitudin leo quis quam gravida semper. Ut egestas et diam sed pretium.'
            />
        </ExpandedCard.Header>
        <ExpandedCard.Body>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
        </ExpandedCard.Body>
        <ExpandedCard.Bottom>
            <Button
                icon= 'archive'
                text= 'Archivar'
            />
        </ExpandedCard.Bottom>
    </ExpandedCard>
);
ExpandedNote.args = {
    variant: 'plain',
};

export const EditFolder = (args) => (
    <ExpandedCard {...args}>
        <ExpandedCard.Top>
            <TopBar variant='noBackground'>
                <TopBar.Left>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <TopBar.Title
                    title='Cancelar'
                    back
                />
                <TopBar.Right>
                    <TopBar.Title
                        title='Hecho'
                    />
                </TopBar.Right>
                <TopBar.Right>
                    <Icon name='edit' fill/>
                </TopBar.Right>
            </TopBar>
        </ExpandedCard.Top>
        <ExpandedCard.Body>
            <Attribute {...args}>
                <Attribute.Title
                    title='Nombre de la carpeta'
                />
                <Attribute.Right>
                    <p>
                                NombreCarpeta
                    </p>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='add_circle' color='#007aff'/>
                </Attribute.Right>
            </Attribute>
        </ExpandedCard.Body>
        <ExpandedCard.Bottom>
            <Button
                icon= 'archive'
                text= 'Archivar'
            />
            <Button
                textColor='#ff3b30'
                icon= 'delete'
                text= 'Eliminar'
            />
        </ExpandedCard.Bottom>
    </ExpandedCard>
);
EditFolder.args = {
    variant: 'glass',
};

export const ExpandedEvent = (args) => (
    <ExpandedCard {...args}>
        <ExpandedCard.Top>
            <TopBar
                variant='noBackground'
                color='#4cd964'
            >
                <TopBar.Left>
                    <Icon name='arrow_back_ios'/>
                </TopBar.Left>
                <TopBar.Title
                    title='FolderName'
                    back
                />
                <TopBar.Right>
                    <Icon name='bookmark'/>
                </TopBar.Right>
                <TopBar.Right>
                    <Icon name='edit'/>
                </TopBar.Right>
            </TopBar>
        </ExpandedCard.Top>
        <ExpandedCard.Header>
            <ExpandedCard.Header.Title
                title='Título'
                subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis nec nisi eget porta. Fusce sollicitudin leo quis quam gravida semper. Ut egestas et diam sed pretium.'
            />
        </ExpandedCard.Header>
        <ExpandedCard.Body>
            <Attribute {...args}>
                <Attribute.Title
                    title='Asignar tareas de:'
                />
            </Attribute>
            <Card variant='glass'>
                <Card.Header>
                    <Card.Header.Left>
                        <Icon name='circle'/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title='Folder'
                        subtitle='Subtitulo'
                    />
                </Card.Header>
            </Card>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
            </Attribute>
        </ExpandedCard.Body>
        <ExpandedCard.Bottom>
        </ExpandedCard.Bottom>
    </ExpandedCard>
);
ExpandedEvent.args = {
    color: '#4cd964',
};
export const EditEvent = (args) => (
    <ExpandedCard {...args}>
        <ExpandedCard.Top>
            <TopBar
                variant='noBackground'
                color='#4cd964'
            >
                <TopBar.Title
                    title='Cancelar'
                />
                <TopBar.Right>
                    <Icon name='bookmark'/>
                </TopBar.Right>
                <TopBar.Right>
                    <Icon name='edit' fill/>
                </TopBar.Right>
            </TopBar>
        </ExpandedCard.Top>
        <ExpandedCard.Header>
            <ExpandedCard.Header.Title
                title='Título'
                subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis nec nisi eget porta. Fusce sollicitudin leo quis quam gravida semper. Ut egestas et diam sed pretium.'
            />
        </ExpandedCard.Header>
        <ExpandedCard.Body>
            <Attribute {...args}>
                <Attribute.Title
                    title='Asignar tareas de:'
                />
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Card variant='glass'>
                <Card.Header>
                    <Card.Header.Left>
                        <Icon name='circle'/>
                    </Card.Header.Left>
                    <Card.Header.Title
                        title='Folder'
                        subtitle='Subtitulo'
                    />
                </Card.Header>
            </Card>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <p>
                                Pl. Caídos, s/n, 37008 Salamanca
                    </p>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='cancel' color='#ff3b30'/>
                </Attribute.Right>
            </Attribute>
            <Attribute {...args}>
                <Attribute.Title
                    title='Ubicación'
                />
                <Attribute.Right>
                    <Icon name='pin_drop'/>
                </Attribute.Right>
                <Attribute.Right>
                    <Icon name='add_circle' color='#007aff'/>
                </Attribute.Right>
            </Attribute>
        </ExpandedCard.Body>
        <ExpandedCard.Bottom>
            <Button
                textColor='#ff3b30'
                icon= 'delete'
                text= 'Eliminar'
            />
        </ExpandedCard.Bottom>
    </ExpandedCard>
);
EditEvent.args = {
    color: '#4cd964',
};
