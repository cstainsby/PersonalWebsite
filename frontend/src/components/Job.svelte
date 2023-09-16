


<script lang="ts">
    import type { Job } from "$lib/templates/Job"

    interface JobProps {
        job: Job
    }

    export let job: JobProps["job"]

    /**
     * This function will convert YYYY-MM formated date strings to Date Objects
     * @param dateStr 
     * @returns yearMonthDate
     */
    function yearMonthFormatToDate(dateStr: string): Date {
        const [year, month] = dateStr.split('-')
        const numYear = Number(year)
        const numMonth = Number(month)

        if (!year || !month || year === undefined || month === undefined){
            throw new Error("Invalid yearMonth date passed to yearMonthFormatToDate");
        } 
        return new Date(numYear, numMonth)
    }

    /**
     * converts a date to string which contains a month and date which will be used for display
     * @param date 
     * @returns displayString
     */
    function convertDateToMonthYearDateDisplayStr(date: Date): string {
        let displayStr = "";
        
        const dateString = date.toDateString()
        const dateStringList = dateString.split(" ");

        if (dateStringList.length === 4) {
            // toDateString() should return "Day Month DayInMonth Year"
            const month = dateStringList[1]
            const year = dateStringList[3]
            displayStr += month;

            // add period indicating contraction if month word length greater than 4
            if (month.toLowerCase() !== "may" || 
                month.toLowerCase() !== "june" || 
                month.toLowerCase() !== "july") {
                    displayStr += ".";
            }
            displayStr += (" " + year);
        }
        return displayStr;
    }
</script>




<style lang="scss">
    .job {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        // padding: 12px;
        width: fit-content;
        // border: 2px solid var(--darkT-black-2);
        // background-color: var(--darkT-black-1);
        border-radius: 4px;
        min-height: 200px;
        height: auto;
        width: 30%;

        & > div > p {
            font-size: smaller;
            margin-left: 8px;
        }

        & img {
            margin-left: 12px;
            height: 5rem;
        }
    }

    .listed-transition-item {
        border-radius: 50%;
        padding: 8px;
        background-color: var(--blue);
    }

    .listed-item {
        margin-right: 24px;

        @media (min-width: 0px) and (max-width: 800px) {
            justify-content: center;
        }

    }
</style>

<div class="job">
    <div class="job-text-content">
        <h3>{job.title}</h3>
        {#if job.employer}
            <p>Employer: {job.employer}</p>
        {/if}
        <p>
            {convertDateToMonthYearDateDisplayStr(yearMonthFormatToDate(job.startDate))} - 
            {#if job.endDate}
                {convertDateToMonthYearDateDisplayStr(yearMonthFormatToDate(job.endDate))}
            {:else}
                In Progress
            {/if}
        </p>
    </div>
    <img src={String(job.imgPath)} alt={String(job.imgAltText)}/>
</div>