import Swal, { SweetAlertIcon } from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'button h-button is-primary',
        popup: 'container-class',
        title: 'title-sweet',
        htmlContainer: 'title-sweet'
    },
    buttonsStyling: false
})

export function SweetAlertMessage(icon: SweetAlertIcon, title: string, text: string) {
    return swalWithBootstrapButtons.fire({
        icon: icon,
        title: title,
        html: text,
        confirmButtonColor: '#039BE5',
        confirmButtonText: 'Ok'
    });
}