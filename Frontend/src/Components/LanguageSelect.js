import '../CSS/LanguageSelect.scss';
//https://stackoverflow.com/questions/57539082/switch-the-language-in-react-without-using-external-libraries
//https://flagicons.lipis.dev/
//https://codyhouse.co/blog/post/accessible-language-picker

function LanguageSelect() {
    return(
        <div className="language-select-container">
            <select className="language-select" name="language-picker-select" id="language-picker-select">
                <option lang="it" value="italiano" selected>Italiano</option>
                <option lang="en" value="english">English</option>
            </select>
        </div>
    );
}


export default LanguageSelect;