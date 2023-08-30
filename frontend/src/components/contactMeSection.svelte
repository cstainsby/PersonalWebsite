<script lang="ts">
    import ProfessionalLinkRow from "./professionalLinkRow.svelte";
    import type { ImageLink } from "$lib/websiteInterfaces";
    import { addToast } from "$lib/store";
    import type { Toast } from "$lib/websiteInterfaces";
    import Spinner from "./Spinner.svelte";
    import type Email from "../lib/templates/Email";
    import MenuToolbar from "./menuToolbar.svelte";

    interface ContactMeSectionProps {
        phoneNumber?: string
        email?: string
        links: ImageLink[]
    }

    export let phoneNumber: ContactMeSectionProps["phoneNumber"];
    export let email: ContactMeSectionProps["email"];
    export let links: ContactMeSectionProps["links"];
    

    let sendingMail = false
    let responseMessage = ""

    const onEmailSend = async (e: SubmitEvent) => {
        e.preventDefault()

        sendingMail = true
        
        const formElement = e.target as HTMLFormElement;
        if (formElement !== null) {
            const formData = new FormData(formElement);

            const errorToast: Toast = {
                message: "Email Send Attempt Failed",
                type: "error",
                timeoutTime: 5000,
            }
            const successToast: Toast = { 
                message: "Email Successfully Sent",
                type: "success",
                timeoutTime: 5000,
            }

            let emailSuccessFlag: boolean = false


            const res = await fetch(formElement.action, {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(resJson => {
                const resData = JSON.parse(resJson.data)
                const resDataDirector = resData[0]


                if (!resDataDirector.success) {
                    console.log("Error: missing success property in form server return data");
                    emailSuccessFlag = false;
                    return 
                }

                const emailSentSuccessfully = resData[resDataDirector.success]
                console.log(emailSentSuccessfully);
                

                if (emailSentSuccessfully) {
                    emailSuccessFlag = true;
                    return
                }
            })
            .catch(err => {
                emailSuccessFlag = false;
                return 
            })
            .finally(() => { sendingMail = false })

            if (emailSuccessFlag) {
                addToast(successToast)
            } else {
                addToast(errorToast)
            }
        }
    }
</script>

<style lang="scss">
    #contact-section {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        background-color: var(--darkT-grey-2);
        border-top: 2px solid var(--darkT-black-2);

        @media (min-width: 0px) and (max-width: 800px) {
            height: 100vh;
        }

        #email-contact-section {
            margin: 24px;
            padding: 24px;
            width: 80%;
        }

        & #email-form {
            display: grid;
            grid-template-areas: 
            "fullname fullname  email email"
            "message message    message message"
            "response response  response submit";
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 6px;
            align-items: center;
            justify-content: center;
            // margin: 5%;
            // margin-right: 15%;
            // margin-left: 15%;

            #from_name { 
                grid-area: fullname;
                height: 36px;
            }
            #from_email { 
                grid-area: email;
                height: 36px;
            }
            #message { 
                grid-area: message;
                resize: vertical;
                height: 150px;
            }
            #response {
                padding-left: 4px;
                grid-area: response;
            }
            // allow the load spinner and response messages to be put into the submit area
            & #email_submit { 
                grid-area: submit;
            }
        }

        & #contact-info {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            margin: 24px;
            width: 80%;
            text-align: start;
        }
        }
</style>


<div id="contact-section">
    <div id="email-contact-section">
        <div id="email-contact-section-header">
            <h2>Contact Me</h2>
            <p>Send me a quick message if you're interesed in working with me!</p>
        </div>
        <form id="email-form" 
            method="POST" 
            action="?/sendEmail"
            on:submit|preventDefault={e => onEmailSend(e)}>
            <input type="text" id="from_name" name="from-name" placeholder="Full Name" required>
            <input type="email" id="from_email" name="from-email" placeholder="Email" required>
            <textarea id="message" name="message" placeholder="Message" required></textarea>
            {#if sendingMail}
                <Spinner/>
            {:else}
                <button class="word-link button" 
                        type="submit" 
                        id="email_submit" 
                        name="email_submit">Send</button>
            {/if}
            <div id="response">{responseMessage}</div>
        </form>
    </div>
    
    <div id="contact-info">
        {#if phoneNumber}
            <div>
                <h3>Phone</h3>
                <p>{phoneNumber}</p>
            </div>
        {/if}
        {#if email}
            <div>
                <h3>Email</h3>
                <p>{email}</p>
            </div>
        {/if}
        <ProfessionalLinkRow
            imageLinks={links}/>

            <!-- <MenuToolbar/> -->
    </div>
</div>