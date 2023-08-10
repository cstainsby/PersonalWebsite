<script>
    import ProfessionalLinkRow from "./professionalLinkRow.svelte";

</script>

<style lang="scss">
    #contact-section {
        margin-top: 24px;
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
            margin-top: 48px;

            & .image-link {
            margin-right: 24px;
            }
        }
        }
</style>


<div id="contact-section">
    <div>
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
            <div>
                <h3>Phone</h3>
                <p>425-214-3518</p>
            </div>
            <div>
                <h3>Email</h3>
                <p>c.p.stainsby@outlook.com</p>
            </div>
            <ProfessionalLinkRow/>
        </div>
    </div>
</div>