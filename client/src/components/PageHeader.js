import React from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import logo from '../logo.svg';

export const PageHeader = ()=>{
  return (
    <Menu size="massive" inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image
            size='mini'
            src={logo}
            style={{ marginRight: '1.5em' }}
          />
          Runner
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default PageHeader;
