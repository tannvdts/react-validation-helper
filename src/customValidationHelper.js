/**
 * Created by tannguyen on 05/09/2016.
 */

const ValidationHelper = {


    handleCustomValidation:function(name, e) {
        var self = this;
        var value = e.target.value;
        this.customValidation[name].map((func, index) => {
            func(value,function(result){
                self.setState(function(previousState){
                    if(!previousState.validation)
                        previousState.validation = {};
                    if(!previousState.validation[name])
                        previousState.validation[name] = {};
                    if(!previousState.validation[name][result.type])
                        previousState.validation[name][result.type] = {};
                    if(result.value) {
                        previousState.validation[name][result.type][result.validationName] = result.msg;
                    } else {
                        previousState.validation[name][result.type][result.validationName] = null;
                    }
                    return previousState;
                })
            });

        })
    },
    

    getCustomValidationStyle: function(name)
    {
        var self=this;
        var countError, countWarning, countSuccess;
        countError=countWarning=countSuccess=0;
        if(self.state.validation && self.state.validation[name]) {
            
            _.forEach(self.state.validation[name].error, function(value, key) {
                if(value)
                {
                    countError++;
                }
            })
            _.forEach(self.state.validation[name].warning, function(value, key) {
                if(value)
                {
                    countWarning++;
                }
            })
            _.forEach(self.state.validation[name].success, function(value, key) {
                if(value)
                {
                    countSuccess++;
                }
            })

        }
        var result=null;
        if(countError>0) {
            result= 'has-error'
        } else if(countWarning>0) {
            result= 'has-warning'
        } else if(countSuccess>0){
            result= 'has-success'
        } else {
            result= '';
        }
        return result;
    },

    getCustomValidationHelpText:function(name){
        var self= this;
        var text= [];
        if(self.state.validation && self.state.validation[name]) {
            _.forEach(self.state.validation[name].error, function(value, key) {
                if(value)
                {
                    text.push(value);
                }
            })
            _.forEach(self.state.validation[name].warning, function(value, key) {
                if(value)
                {
                    text.push(value);
                }
            })
            _.forEach(self.state.validation[name].success, function(value, key) {
                if(value)
                {
                    text.push(value);
                }
            })
        }
        return text;
    }
}

export default ValidationHelper;