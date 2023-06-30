import { useState,useEffect ,useRef, ChangeEventHandler} from "react";

export interface ValidationOption{
    name:string
    validationMethods: (input:string)=>(string |null)
}
export interface FormDataArray{[fieldName: string]: FormData}

export interface FormData{
  value : string,
  isError:boolean,
  message:string
}

export const useValidation=(validationOption:ValidationOption[])=>{
  const [formData , setFormData] = useState<FormDataArray>({});
  useEffect(()=>{
        const initial:FormDataArray={};
        validationOption.map((ops)=>{
          console.log(ops.name);
        initial[ops.name]={
          value : "",
          message:"",
          isError:false
        };
        setFormData(initial);
      });
    },[])
  /**
    * フォームのinput要素の書き換え時イベント
    * @param key 要素のname
    * @param sanitizeFn バリデーションファンクション
    * @returns 
    */
    const handleChanged = (
        key:string,
        sanitizeFn:((value:string)=>string) | null,
      ) => (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
        setFormData({
          ...formData,
          [key]:{
            message:"",
            value:value,
            isError:false
          }
        });
    };
    /**
     * バリデーション
     */
    const handleValidateAll =():boolean=>{
      let isValid = true;
      Object.keys(formData as FormDataArray).forEach((key)=>{
        //オプションのkeyに該当する要素のvalidationメソッドを呼び出す。
        const validationOps = validationOption.find(y=>y.name === key) as ValidationOption;
        if(!validationOps){
          return;
        }
        const value = formData[key].value;
        const errorMsg = validationOps.validationMethods(value);
       
        if(errorMsg){
          setFormData({
            ...formData,
            [key]:{
              value:value,
              message:errorMsg,
              isError:true
            }
          });
          isValid = !isValid ? false : false; 
        }
      })
    
      console.log(isValid);
      return isValid;
    }
      /**
       * エラーを任意で追加
       * @param key 
       */
      const addError = (key:string,errorMsg:string)=>{
        setFormData({
          ...formData,
          [key]:{
            value:formData[key].value,
            message:errorMsg,
            isError:true
          }
        });
      }
   return {formData:formData, handleChanged:handleChanged,handleValidateAll: handleValidateAll,addError : addError };
}