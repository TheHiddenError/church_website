import { ModalInfo } from "./modal"

export type CardBaseProps = {
    imageSrc: string,
    title: string, 
    description: string,
    button_name: string
    button_action: ()=> void
}

export type CardModalProps = 
| { modal_button: true; modal: ModalInfo } 
| { modal_button: false; modal?: undefined }


export type CardProps = CardBaseProps & CardModalProps;