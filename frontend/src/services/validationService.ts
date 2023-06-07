import { useState } from "react";

export interface ValidationModel{
    fieldName:""
    validationResult : false

}


export const useValidation=(model:ValidationModel[])=>{
    const [validationResult,setValidationResult] =useState(model);


}