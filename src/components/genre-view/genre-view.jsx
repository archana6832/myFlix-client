import React from 'react';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';
import Card from 'react-bootstrap/Card';
import { PropTypes } from 'prop-types';
export class GenreView extends React.Component {

    render() {
        const { genre, onBackClick } = this.props;
        console.log(genre.Name);
        return (
            <Card className="genre-view">
                <Card.Header>
                    <div className="genre-name">
                        {/* <span className="label">Name: </span> */}
                        <span className="value">{this.props.genre.Name}</span>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="genre-description">
                        {/* <span className="label">Description: </span> */}
                        <span className="value">{this.props.genre.Description}</span>
                    </div>

                    <Button className="genre-button" variant="danger" onClick={() => { onBackClick(null); }} >Back</Button>
                </Card.Body>
            </Card>

        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired
}