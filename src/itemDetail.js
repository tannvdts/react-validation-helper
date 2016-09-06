/**
 * Created by tannguyen on 31/08/2016.
 */
import React, {Component, PropTypes} from "react"
import {InputText, Textarea, Select, DatePicker} from "meditek_react_components"
import itemService from '../../../services/itemService'
import cvhelper from '../../../config/customValidationHelper'
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';

export default class ItemDetail extends Component {
    constructor(props) {
        super(props);

        this.customValidation = {
            Code: [
                function(value, done) {
                    var result = true;
                    itemService.checkExist(value||null)
                        .then(function(response){
                            done({
                                validationName: 'itemCodeExist',
                                type: 'error',
                                msg: 'Item Code is exist',
                                value: response.data.status
                            })
                        })

                },

                function(value, done) {
                    done({
                        validationName: 'itemCodetest',
                        type: 'error',
                        msg: 'Item Code is test',
                        value: true
                    })
                }
            ]
        }

        this.state = {
            validation : {
                Code: {}
            },
        };
        this.itemDetail= {};

        _.assignIn(this, cvhelper);

    }

    _onChangeValue(value, name) {
        if(name) {
            let itemDetail = _.cloneDeep(this.props.itemDetail);
            itemDetail[name] = value;
            this.props.onChangeValue(itemDetail, this.props.name);
        }
    }

    render() {
        console.log("BBBBBBBBBBBB", Joi.string().alphanum().min(3).max(30).required().label('Username'))
        let itemTypeOptions = [
            {name: "GOODS", value: "GOODS"},
            {name: "SERVICES", value: "SERVICES"}
        ]
        return (
                <div className="form-horizontal">
                    <div className={"form-group "+this.getCustomValidationStyle('Code')}>
                        <label className="control-label col-sm-3">Item code:</label>
                        <div className="col-sm-8">
                            <InputText type="text"
                                       name="Code"
                                       className="form-control"
                                       placeholder=""
                                       value={this.props.itemDetail.Code}
                                       onChangeValue={this._onChangeValue.bind(this)}
                                       onBlur={this.handleCustomValidation.bind(this, 'Code')}
                            />
                            {
                                this.getCustomValidationHelpText('Code').map((value, index)=>{
                                    return <span key={index} className="help-block">{value}</span>
                                })
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Item name:</label>
                        <div className="col-sm-8">
                                    <Textarea
                                        name="Name"
                                        className="form-control"
                                        value={this.props.itemDetail.Name}
                                        onChangeValue={this._onChangeValue.bind(this)}
                                    >
                                    </Textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Item type:</label>
                        <div className="col-sm-8">
                            <Select className="form-control"
                                    name="Type"
                                    options={itemTypeOptions}
                                    value={this.props.itemDetail.Type}
                                    onChangeValue={this._onChangeValue.bind(this)}
                            >
                                <option value={null}></option>
                            </Select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Description:</label>
                        <div className="col-sm-8">
                                    <Textarea
                                        name="Description"
                                        className="form-control"
                                        value={this.props.itemDetail.Description}
                                        onChangeValue={this._onChangeValue.bind(this)}
                                    >
                                    </Textarea>
                        </div>
                    </div>
                </div>
        )
    }
}

ItemDetail.propTypes = {
    itemDetail: PropTypes.object,
    name: PropTypes.string,
}

ItemDetail.defaultProps = {
    itemDetail: {},
    name: 'itemDetailNaming'
}