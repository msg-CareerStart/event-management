FOR FUNCTIONAL COMPONENTS

- To introduce internationalization to your pages use the Trans component and the useTranslation hook:

### import { useTranslation, Trans } from "react-i18next";

const { t, i18n } = useTranslation();

- The next function re-renders your page based on the language selected on button click.
- It might help you test the new changes if you use it with the buttons below.

const changeLanguage = (lng: string) => {  
 i18n.changeLanguage(lng);
};

<Button onClick={() => changeLanguage("ro")}>ro</Button>
<Button onClick={() => changeLanguage("en")}>en</Button>

- I`ve already created the 'public/locales/en' and 'public/locales/ro' folders.
  You should place your translations there in the 'translation.json' files.

----------------------------------TO TRANSLATE THE TEXT--------------------------------------------

- just wrap it around with the <Trans> component, and precise the coresponding key (i18nKey)
  from the translation.json files like this:

before:

<h1>Welcome</h1>

after:

<h1>
    <Trans i18nKey="welcome.title">Welcome</Trans>
</h1>

-----------------TO TRANSLATE TEXT CONTAINING A LINK COMPONENT or <string>, <em> TAGS-------------------

- use the following structure in the translation.json files (pay attention to the <1> tag!):

  "registration": {
  "loginLink": "Already have an account? <1>Sign in</1>"
  }

- wrap it like this in the file of the component:
<div>
    <Trans i18nKey="registration.loginLink">
    Already have an account? <Link to="/login">Sign in!</Link>
    </Trans>
</div>

-------------------------TO TRANSLATE TEXT FROM INPUT LABELS/PLACEHOLDERS---------------------------
<TextField
label={<Trans i18nKey="login.username">username</Trans>}

> </TextField>

.
.
.
.
FOR CLASS COMPONENTS:

- you can translate text using the withTranslation hoc

### import { withTranslation } from "react-i18next";

- pass "t" down on props. Unfortunatelly I could not come up with a more beautiful solution, but this here is working:

  interface Props {
  t: any;
  }

- to translate the text, put the translation key from the translation.json files inside t(), just like below:

  class WelcomeClass extends Component<Props> {
  render() {
  const { t } = this.props;
  return <h2>{t("welcome.title")}</h2>;
  }
  }
  const Welcome = withTranslation()(WelcomeClass as any);

- use the withTranslation hoc like in the example above. After that, you should be able to refer to your class with this new name, without mentioning the t prop. Just simply:

return (

<div>
    <Welcome />
</div>
)

-----------------------------------FURTHER LINKS-------------------------------------

https://react.i18next.com/latest/using-with-hooks
https://react.i18next.com/guides/quick-start

- and a react-Typescript project, which uses both funtional and class components with i18n
  https://github.com/i18next/react-i18next/tree/master/example/react
