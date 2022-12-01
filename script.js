(() => {
    const elements = {};

    const serializeForm = (form)  => {
        var obj = {};
        var formData = new FormData(form);
        for (var key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    };

    const displayResult = (result) => {
        const { resultContainer } = elements;
        resultContainer.innerHTML = result;
    }

    const init = () => {
        elements.form = document.querySelector('[data-js="form"]')
        elements.resultContainer = document.querySelector('[data-js="result"]')

        const { form } = elements;

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = serializeForm(form);

            fetch('/.netlify/functions/verifier', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            }).then((data) => {
                console.log(data);
                displayResult(data.markup)
            }).catch((error) => {
                console.log(error);
            });
        });
    }



	if (document.readyState === 'complete') {
		init();
	} else {
		window.addEventListener('load', init);
	}

})()