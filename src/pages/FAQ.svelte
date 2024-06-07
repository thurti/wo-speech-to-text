<script lang="ts">
  import UiSection from "@/components/ui/UISection.svelte";
  import PageContainer from "./PageContainer.svelte";
  import { difference } from "lodash";
</script>

<PageContainer title="FAQ">
  <UiSection id="slow">
    <slot slot="heading">Why is transcribing so slow?</slot>
    <p>
      Speech recognition is a very resource intensive task. Due to the
      limitations of WASM, the process is about 10x slower compared to a native
      application (with GPU support). The encoding speed also depends on the
      model file and the length of the input file.
    </p>
    <p>
      Consider to use a native application or a cloud service for better
      performance and results.
    </p>
  </UiSection>

  <UiSection id="model">
    <slot slot="heading">What is a model file?</slot>
    <p>
      The application uses a so called model file to convert the audio data to
      text. The model file is a pre-trained neural network that is used to
      predict the text from the audio data. The model file is loaded into the
      browser memory and used for the conversion.
    </p>
  </UiSection>

  <UiSection id="model-support">
    <slot slot="heading">Why is there no support for large models?</slot>
    <p>
      The application is limited by the browsers memory. Loading a large model
      file would propably exceed the memory limit of the browser. Also the
      performance would be near unusable due to the slow processing speed.
    </p>
  </UiSection>

  <UiSection id="model-q">
    <slot slot="heading"
      >What is the difference between the normal and q5 version of a model file?</slot
    >
    <p>
      The q5 version is a quantized version of the normal model file. The
      quantized version is smaller in size and faster to load. The quality of
      the conversion is slightly worse compared to the normal version.
    </p>
  </UiSection>

  <UiSection id="offline">
    <slot slot="heading">
      Why do I get the message that my browser doesn't support offline
      capability?
    </slot>
    <p>
      To work offline, your browser needs to support service worker. The latest
      versions of Chrome, Firefox and Safari should work. So check if you have
      the latest version installed.
    </p>
    <p>
      Please also check if you have <b>cookies enabled</b> in your browser settings.
      If cookies are disabled completly the browser doesn't allow to store any data
      locally. This includes caching the data in a service worker for offline capability.
    </p>
  </UiSection>

  <UiSection id="cache">
    <slot slot="heading">
      Why does the application data gets preloaded everytime, aka why does the
      application data not persist?
    </slot>
    <p>
      The application data is stored in the browsers cache storage. If you have
      set your browser to delete all data (cookies and website data) on close
      the application data will be deleted.
    </p>
  </UiSection>

  <UiSection id="ffmpeg-error">
    <slot slot="heading">I get an error while transcribing a file.</slot>
    <p>
      Your browser needs to support <b>Shared Array Buffer</b>. Chrome 68+,
      Firefox 79+, Safari 15.2+ and Edge 79+ should work. You can get more
      informations on supported browsers at
      <a href="https://caniuse.com/?search=sharedarraybuffer" target="_blank"
        >caniuse.com</a
      >.
    </p>
    <p>
      You can also check the output in the <b>logs</b> console.
    </p>
  </UiSection>

  <UiSection id="size-limit">
    <slot slot="heading">Why can I only transcribe files up to 2GB?</slot>
    <p>
      This is a hard limit of the browser when using service workers. This may
      change in the future.
    </p>
  </UiSection>

  <UiSection id="who">
    <slot slot="heading">Who are you and why have you created this?</slot>
    <p>
      I'm a freelance web devolper with a passion for web apps. I've created
      this as a side project to learn more about progressive web apps. Check out
      my site at <a href="https://thomashurtig.de" target="_blank"
        >thomashurtig.de</a
      >.
    </p>
  </UiSection>
</PageContainer>
