import React from 'react';
import Button from 'react-bootstrap/Button';
import './director-view.scss';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
export class DirectorView extends React.Component {

    render() {
        const { director, onBackClick } = this.props;
        console.log(director);

        return (
            <Card className="director-view">
                <Card.Header>
                    <div className="director-name">
                        {/* <span className="label">Name: </span>*/}
                        <span className="value">{this.props.director.Name}</span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="director-bio">
                        <span className="label">Bio: </span>
                        <span className="value">{this.props.director.Bio}</span>
                    </div>
                    <div className="director-birth-year">
                        <span className="label">Birth Year: </span>
                        <span className="value">{this.props.director.Birth}</span>
                    </div>
                    <div className="director-death-year">
                        <span className="label">Death Year: </span>
                        <span className="value">{director.Death}</span>
                    </div>
                    <Button className="director-button" variant="danger" onClick={() => { onBackClick(null); }} >Back</Button>
                </Card.Body>
            </Card>

        );
    }
}
