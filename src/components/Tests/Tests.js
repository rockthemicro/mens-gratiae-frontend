import React from "react";
import {connect} from "react-redux";
import {List, Avatar} from 'antd';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

const Tests = (props) => {

    const RO = 'ro';
    const IT = 'it';
    const EN = 'en';
    const data = [{
        title: 'Research1',
        description: 'Description of first research',
        language: 'ro'
    }, {
        title: 'Research2',
        description: 'Description of second research',
        language: 'en'
    }, {
        title: 'Research3',
        description: 'Description of third research',
        language: 'en'
    }, {
        title: 'Research4',
        description: 'Description of forth research',
        language: 'it'
    }, {
        title: 'Research1',
        description: 'Description of first research',
        language: 'ro'
    }, {
        title: 'Research2',
        description: 'Description of second research',
        language: 'en'
    }, {
        title: 'Research3',
        description: 'Description of third research',
        language: 'ro'
    }, {
        title: 'Research4',
        description: 'Description of forth research',
        language: 'en'
    }, {
        title: 'Research1',
        description: 'Description of first research',
        language: 'ro'
    }, {
        title: 'Research2',
        description: 'Description of second research',
        language: 'it'
    }, {
        title: 'Research3',
        description: 'Description of third research',
        language: 'ro'
    }, {
        title: 'Research4',
        description: 'Description of forth research',
        language: 'it'
    }];

    const getFlagPath = (language) => {
      if (language === RO) {
          return require('../../resources/romania-flag.svg');
      } else if (language === IT) {
          return require('../../resources/italian-flag.png');
      } else if (language === EN) {
          return require('../../resources/england-flag.png');
      }
    };

    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={getFlagPath(item.language)} />}
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Tests);