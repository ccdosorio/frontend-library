import Swal, { SweetAlertIcon } from 'sweetalert2';

export function SweetAlertMessage(icon: SweetAlertIcon, title: string, text: string) {
    return Swal.fire({
        icon: icon,
        title: title,
        html: text,
        confirmButtonColor: '#3F51B5',
        confirmButtonText: 'Ok',
    });
}