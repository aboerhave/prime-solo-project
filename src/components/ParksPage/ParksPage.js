import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

class ParksPage extends Component {

    componentDidMount = () => {
        // need to make get request to get data of list of parks here
        this.getParks();
    }

    getParks = () => {
        this.props.dispatch({type: 'GET_PARKS'});
    }

    getAttractions = (event, parkId) => {
        console.log('clicked with parkId', parkId);
        
    }

    render() {
        return (
            // <Container>
            <>
                <Container>
                    <h2 >Parks</h2>
                </Container>

                <Container>
                    <Row>
                        <Col >
                            <h4>Click a park to see a list of experiences there</h4>
                        </Col>
                    </Row>
                </Container>
                <ul>
                    {this.props.store.parks.map((park) => {
                        return (
                            <li key={park.id} >
                                <Link to={`/attractions/${park.id}`} >
                                    
                                    {park.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
             {/* </Container> */}
             {JSON.stringify(this.props)}
             {/* <button onClick={()=>this.props.history.goBack()}>GO BACK</button> */}
            </>
        );
    }
}

export default connect(mapStoreToProps)(ParksPage);
