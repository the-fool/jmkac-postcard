async function doit() {
    const formData = new FormData();
    const file = document.querySelector('input').files[0];
    formData.append(file.name, file);

    set_loading();

    await fetch('https://us-central1-jmkac-postcard.cloudfunctions.net/get_signed_url', {
        method: 'POST',
        mode: 'cors',
        body: formData
    });

    set_done_loading();
}

function set_loading() {
    document.querySelector('#notif').textContent = 'loading';
}

function set_done_loading() {
    document.querySelector('#notif').textContent = 'all done!';
}