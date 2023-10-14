<!-- 
    https://gist.github.com/MagicJohnJang/3cde82004e632e66b0fc5c156a7c16e9

 -->

<script lang="ts">
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import * as d3Sankey from 'd3-sankey';

    import type { JobApplication, Location } from "$lib/templates/Job";
    import ApplicationTable from './ApplicationTable.svelte';
    // import { getUserJobApplications } from '$lib/aws';
    import { publicUserData } from '$lib/userStore';

    // stores the applications sent out since last job was accepted
    let currentApplicationList: JobApplication[] = []
    // publicUserData.subscribe(userInfo => {
    //     if (userInfo?.userId) {
    //         getUserJobApplications(userInfo.userId)
    //         .then(data => {
    //             // console.log(data);
                
    //         })
    //     }
    // })

    let el;

    let walgreensApp: JobApplication = {
        companyName: "Walgreens",
        positionName: "Software Engineer (RxR) Bellevue V",
        appliedOn: new Date(2023, 7, 12),
        locations: [
            {
                cityName: "Bellevue",
                stateName: "Washington",
                countryName: "United States"
            }
        ],
        salary: {
            rangeLow: 75000,
            rangeHigh: 75000
        },
        referencesUsed: [],
        yearsOfExpirienceRequired: 0,
        rejected: "automated email",
        status: "Rejected"
    } 
    currentApplicationList.push(walgreensApp)
    currentApplicationList.push(walgreensApp)
    currentApplicationList.push(walgreensApp)
    currentApplicationList.push(walgreensApp)


    interface SNodeExtra {
        nodeId: number
        name: string
    }
    interface SEdgeExtra {
        src: number
        tgt: number
        value: number
        uom: string
    }
    type SNode = d3Sankey.SankeyNode<SNodeExtra, SEdgeExtra>;
    type SLink = d3Sankey.SankeyLink<SNodeExtra, SEdgeExtra>;

    // directed acyclic graph
    interface DAG {
        nodes: SNode[]
        edges: SLink[]
    }

    onMount(() => {
        drawSankeyChart()
    })

    function drawSankeyChart() {
        const width = 928;
        const height = 600;
        const format = d3.format(",.0f");

        let svgElement = d3.select("#sankey-diagram")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

        let sankeyDiagram = d3Sankey.sankey()
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[1, 1], [width - 1, height - 6]]);

        // let sankeyData: DAG = {

        // }
    }
</script>

<div bind:this={el} id="sankey-diagram">
</div>

<ApplicationTable jobApplications={currentApplicationList}/>