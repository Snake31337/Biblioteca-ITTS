import '../CSS/LanguageSelect.scss';
//https://stackoverflow.com/questions/57539082/switch-the-language-in-react-without-using-external-libraries
//https://flagicons.lipis.dev/
//https://codyhouse.co/blog/post/accessible-language-picker

function LanguageSelect() {
    var langs = [
        {
            label: "Italiano",
            value: "it_IT"
        },
        {
            label: "English",
            value: "en_US"
        }
    ];

    
    return(
        <div className="language-select-container">
            <select className="language-select" name="language-picker-select" id="language-picker-select">
                {langs.map((lang) => (
                    <option value={lang.value}>{lang.label}</option>
                ))};

            </select>
        </div>
    );
}


export default LanguageSelect;