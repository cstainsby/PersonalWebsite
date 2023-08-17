<style lang="scss">
    .spinner {
        border: 8px solid white; /* Light grey */
        border-top: 8px solid var(--darkT-black-1); /* Blue */
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 2s linear infinite;
    }
  
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
  
<div class="spinner" >
</div>
  