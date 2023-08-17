<script lang="ts">
    import ProfessionalLinkRow from "./professionalLinkRow.svelte";


    import type { ImageLink } from "$lib/websiteInterfaces";

    interface ContactMeSectionProps {
        phoneNumber?: string
        email?: string
        links?: ImageLink[]
    }

    export let phoneNumber: ContactMeSectionProps["phoneNumber"];
    export let email: ContactMeSectionProps["email"];
    export let links: ContactMeSectionProps["links"]    
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
        
        & .section-title {
            text-align: center;
        }

        // & #email-contact-section {
        //   display: flex;
        //   flex-direction: row;
        //   justify-content: center;

        //   & #email-contact-section-header {
        //     max-width: 200px;
        //   }
        // }
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
            "none none          none submit";
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
                height: 72px;
                resize: vertical;
            }
            // allow the load spinner and response messages to be put into the submit area
            & .email-response-item,
            #email_submit { 
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
        <form id="email-form">
            <input type="text" id="from_name" name="from_name" placeholder="Full Name" required>
            <input type="email" id="from_email" name="from_email" placeholder="Email" required>
            <textarea id="message" name="message" placeholder="Message" required></textarea>
            <a class="word-link button" type="submit" id="email_submit" name="email_submit">Send</a>
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
    </div>
</div>