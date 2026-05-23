import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const siteUrl = 'https://vikasjhd.github.io/zone-privacy';

const locales = [
  { code: 'en', dir: '.', label: 'English' },
  { code: 'en-GB', dir: 'en-gb', label: 'English (UK)' },
  { code: 'en-CA', dir: 'en-ca', label: 'English (Canada)' },
  { code: 'en-AU', dir: 'en-au', label: 'English (Australia)' },
  { code: 'es', dir: 'es', label: 'Español (España)' },
  { code: 'es-MX', dir: 'es-mx', label: 'Español (México)' },
  { code: 'pt-BR', dir: 'pt-br', label: 'Português (Brasil)' },
  { code: 'fr', dir: 'fr', label: 'Français' },
  { code: 'de', dir: 'de', label: 'Deutsch' },
  { code: 'it', dir: 'it', label: 'Italiano' },
];

const pages = ['index', 'support', 'privacy'];

const english = {
  common: {
    support: 'Support',
    privacy: 'Privacy',
    privacyPolicy: 'Privacy Policy',
    language: 'Language',
    rights: 'All rights reserved.',
    supportSubject: 'Zone App Support Request',
  },
  home: {
    title: 'Zone - Reclaim Your Focus',
    description: 'The uncompromising focus timer for professionals. Block distracting apps and reclaim your time.',
    heroTitle: 'Silence the <br><span class="text-gray-500">Noise.</span>',
    heroBody: 'The uncompromising focus timer for professionals. Physically block your most distracting apps and leverage native iOS architecture to keep you in a flow state.',
    appStoreCta: 'Download on the App Store',
    timerAlt: 'Zone timer interface',
    appPickerTitle: 'Choose Your Battles.',
    appPickerBody: 'Target the exact apps and websites that pull you out of your workflow. Zone uses Apple\'s native Screen Time frameworks to securely hide your biggest digital vices the moment a session begins.',
    appPickerAlt: 'Zone app selection',
    strictTitle: 'Strictly Enforced.',
    strictBody: 'Standard timers just ring. Zone blocks distractions during your session. When Strict Mode is engaged, in-app pausing and cancellation are disabled so your deep work block stays protected until the timer completes.',
    strictAlt: 'Zone Strict Mode settings',
    protectedTitle: 'Focus Protected.',
    protectedBody: 'When you are in the Zone, your iPhone transforms into a dedicated productivity tool. We guard your attention so you can lock in, do the work, and build unstoppable momentum.',
    protectedAlt: 'Zone active session',
    privacyTitle: 'Your Focus, <br>Your Business.',
    privacyBody: 'Zone uses a Zero-Knowledge privacy model for your app selections and focus history. We cannot see, track, or monitor the specific apps you block. For Live Activity updates only, Zone sends the minimum timer state needed to update your Lock Screen and Dynamic Island.',
    privacyLink: 'Read our strict Privacy Policy',
    privacyAlt: 'Zone zero-knowledge architecture',
    insightsTitle: 'Reclaim Your Time.',
    insightsBody: 'Build unstoppable momentum by tracking your daily win streaks. Monitor your deep work history, see how many times Zone intervened, and optionally sync your completed sessions directly to Apple Health as Mindful Minutes.',
    insightsAlt: 'Zone insights dashboard',
    dailyStreaks: 'Daily Streaks',
    appleHealthSync: 'Apple Health Sync',
  },
  support: {
    title: 'Support - Zone Focus App',
    description: 'Help and support for Zone: Reclaim your Focus.',
    headerTitle: 'How can we help?',
    headerSubtitle: 'Support and frequently asked questions for Zone.',
    contactTitle: 'Contact Support',
    contactBody: 'Having issues or want to request a feature? Reach out directly to the developer.',
    emailCta: 'Email Support',
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Why does Zone need Screen Time permissions?',
        a: 'Zone uses Apple\'s native FamilyControls and DeviceActivity APIs to prevent you from opening distracting apps while a focus session is active. This permission is required for app shielding to work natively on iOS.',
      },
      {
        q: 'Can you see which apps I am blocking?',
        a: 'No. Zone operates on a strict zero-knowledge privacy model for app selection and shielding. Apple\'s frameworks handle app selection locally on your device, and we cannot see, read, or access the names of the apps, websites, or categories you block. For Live Activity updates only, Zone sends a minimal timer scheduling payload as described in the Privacy Policy.',
      },
      {
        q: 'Does Zone use a server?',
        a: 'Zone does not use a server for accounts, analytics, blocked app selections, focus history, streaks, insights, weekly summaries, or Apple Health data. A minimal Google Cloud scheduler is used only to help update Live Activities and Dynamic Island when a timer completes while the app is not open.',
      },
      {
        q: 'How do I cancel a session if Strict Mode is on?',
        a: 'You can\'t. That is the point of Strict Mode. If you enable Strict Mode, the "End Session" button is disabled to prevent you from abandoning your deep work block. You must wait for the timer to complete to unlock your shielded apps.',
      },
      {
        q: 'Why isn\'t the Live Activity showing on my Dynamic Island?',
        a: 'Ensure that you are running iOS 18 or later, and check that Live Activities are enabled for Zone in your iPhone\'s main Settings app (Settings &gt; Zone &gt; Live Activities).',
      },
      {
        q: 'How does the Apple Health integration work?',
        a: 'If enabled in Settings, Zone can save your completed deep work sessions to the Apple Health app as "Mindful Minutes." We only request <em>write</em> access, meaning we cannot read your personal health metrics. If sessions are not syncing, check <strong>iOS Settings &gt; Health &gt; Data Access &amp; Devices &gt; Zone</strong> to ensure permission is granted.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy - Zone Focus App',
    description: 'Privacy Policy for Zone: Zero-Knowledge focus data with minimal Live Activity scheduling.',
    headerTitle: 'Privacy Policy',
    effectiveDate: 'Effective Date: May 12, 2026',
    translationNotice: '',
    sections: [
      {
        title: '1. Zero-Knowledge Architecture',
        body: 'Zone is built on a strict "Zero-Knowledge" privacy model for your focus data. We do not require an account, we do not track your app usage, we do not monitor your screen time, and we do not collect analytics about your behavior.',
      },
      {
        title: '2. Apple Family Controls',
        body: 'To provide its core distraction-blocking features, Zone uses Apple\'s native FamilyControls and ManagedSettings APIs.',
        items: [
          '<strong class="text-gray-200">Local Processing:</strong> The list of applications, websites, and categories you choose to block is encrypted and managed by iOS.',
          '<strong class="text-gray-200">No Developer Access:</strong> We cannot see, read, or access the names of the apps, websites, or categories you select. This selection data never leaves your device.',
        ],
      },
      {
        title: '3. Data Collection and Storage',
        body: 'Zone does not collect account, identity, advertising, analytics, app-selection, or screen-time data.',
        items: [
          'Your focus session history, total time reclaimed, streak data, insights, and weekly summaries are saved locally on your device.',
          'We do not use third-party analytics SDKs to track your behavior or screen interactions.',
          'We do not sell, rent, or share your personal data with advertisers or data brokers.',
        ],
      },
      {
        title: '4. Live Activities and Dynamic Island',
        body: 'Zone uses Apple\'s Live Activity system to keep your Lock Screen and Dynamic Island timer updated. To support completion updates when the app is not open, Zone sends a minimal scheduling payload to our Google Cloud backend.',
        items: [
          '<strong class="text-gray-200">What is sent:</strong> The Live Activity push token, remaining timer seconds, running or completion state, and APNs environment.',
          '<strong class="text-gray-200">What is not sent:</strong> Your blocked app list, websites, app categories, focus history, streaks, insights, Apple Health data, name, email address, or account information.',
          '<strong class="text-gray-200">Purpose:</strong> This data is used only to schedule and deliver Live Activity updates through Apple Push Notification service.',
        ],
      },
      {
        title: '5. Apple Health Integration',
        body: 'Zone offers an optional feature to save your completed deep work sessions to the Apple Health app as "Mindful Minutes."',
        items: [
          '<strong class="text-gray-200">Local Writing Only:</strong> Zone only requests permission to <em>write</em> Mindful Minutes to your local Apple Health database. We do not read your other health metrics.',
          '<strong class="text-gray-200">No Transmission:</strong> Your Apple Health data is never transmitted to our servers.',
          '<strong class="text-gray-200">Strictly Private:</strong> We will never sell, share, or use your Apple Health data for advertising, marketing, or data-broker purposes.',
        ],
      },
      {
        title: '6. Changes to This Policy',
        body: 'If we introduce optional features in the future that require additional data processing or syncing, this policy will be updated, and those features will require your explicit, prior consent where required.',
      },
      {
        title: '7. Contact',
        body: 'If you have any questions about our privacy practices, please contact us at <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
      },
    ],
  },
};

const translations = {
  en: english,
  'en-GB': withOverrides(english, {
    privacy: { effectiveDate: 'Effective date: 12 May 2026' },
  }),
  'en-CA': withOverrides(english, {
    privacy: { effectiveDate: 'Effective date: May 12, 2026' },
  }),
  'en-AU': withOverrides(english, {
    privacy: { effectiveDate: 'Effective date: 12 May 2026' },
  }),
  es: {
    common: {
      support: 'Ayuda',
      privacy: 'Privacidad',
      privacyPolicy: 'Política de privacidad',
      language: 'Idioma',
      rights: 'Todos los derechos reservados.',
      supportSubject: 'Solicitud de ayuda para Zone',
    },
    home: {
      title: 'Zone - Recupera tu concentración',
      description: 'El temporizador de concentración exigente para profesionales. Bloquea apps que te distraen y recupera tu tiempo.',
      heroTitle: 'Apaga el <br><span class="text-gray-500">ruido.</span>',
      heroBody: 'El temporizador de concentración exigente para profesionales. Bloquea físicamente tus apps más distractoras y utiliza la arquitectura nativa de iOS para mantenerte en estado de concentración.',
      appStoreCta: 'Descargar en el App Store',
      timerAlt: 'Interfaz del temporizador de Zone',
      appPickerTitle: 'Elige tus batallas.',
      appPickerBody: 'Selecciona exactamente las apps y sitios web que te sacan del flujo de trabajo. Zone usa los frameworks nativos de Tiempo de uso de Apple para ocultar de forma segura tus mayores tentaciones digitales en cuanto empieza una sesión.',
      appPickerAlt: 'Selección de apps en Zone',
      strictTitle: 'Cumplimiento estricto.',
      strictBody: 'Los temporizadores normales solo avisan. Zone bloquea distracciones durante la sesión. Cuando activas el Modo estricto, se desactivan la pausa y la cancelación dentro de la app para que tu bloque de trabajo profundo quede protegido hasta que termine el temporizador.',
      strictAlt: 'Ajustes del Modo estricto de Zone',
      protectedTitle: 'Concentración protegida.',
      protectedBody: 'Cuando estás en Zone, tu iPhone se convierte en una herramienta dedicada a la productividad. Protegemos tu atención para que entres en materia, hagas el trabajo y mantengas el impulso.',
      protectedAlt: 'Sesión activa de Zone',
      privacyTitle: 'Tu concentración, <br>solo tuya.',
      privacyBody: 'Zone utiliza un modelo de privacidad de conocimiento cero para tus selecciones de apps y tu historial de concentración. No podemos ver, rastrear ni supervisar las apps concretas que bloqueas. Solo para las Actividades en directo, Zone envía el estado mínimo del temporizador necesario para actualizar la pantalla bloqueada y Dynamic Island.',
      privacyLink: 'Lee nuestra Política de privacidad estricta',
      privacyAlt: 'Arquitectura de conocimiento cero de Zone',
      insightsTitle: 'Recupera tu tiempo.',
      insightsBody: 'Crea impulso siguiendo tus rachas diarias. Consulta tu historial de trabajo profundo, revisa cuántas veces ha intervenido Zone y, si quieres, sincroniza tus sesiones completadas directamente con Salud de Apple como minutos de atención plena.',
      insightsAlt: 'Panel de estadísticas de Zone',
      dailyStreaks: 'Rachas diarias',
      appleHealthSync: 'Sincronización con Salud',
    },
    support: {
      title: 'Ayuda - Zone Focus App',
      description: 'Ayuda y soporte para Zone: recupera tu concentración.',
      headerTitle: '¿En qué podemos ayudarte?',
      headerSubtitle: 'Ayuda y preguntas frecuentes sobre Zone.',
      contactTitle: 'Contactar con soporte',
      contactBody: '¿Tienes algún problema o quieres sugerir una función? Escríbele directamente al desarrollador.',
      emailCta: 'Enviar correo a soporte',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Por qué necesita Zone permisos de Tiempo de uso?',
          a: 'Zone utiliza las API nativas FamilyControls y DeviceActivity de Apple para impedir que abras apps que te distraen mientras una sesión de concentración está activa. Este permiso es necesario para que el bloqueo de apps funcione de forma nativa en iOS.',
        },
        {
          q: '¿Podéis ver qué apps bloqueo?',
          a: 'No. Zone funciona con un modelo estricto de privacidad de conocimiento cero para la selección y el bloqueo de apps. Los frameworks de Apple gestionan la selección de apps localmente en tu dispositivo, y no podemos ver, leer ni acceder a los nombres de las apps, sitios web o categorías que bloqueas. Solo para las Actividades en directo, Zone envía una carga mínima de programación del temporizador, tal como se describe en la Política de privacidad.',
        },
        {
          q: '¿Zone usa un servidor?',
          a: 'Zone no usa un servidor para cuentas, analíticas, selecciones de apps bloqueadas, historial de concentración, rachas, estadísticas, resúmenes semanales ni datos de Salud de Apple. Solo se usa un programador mínimo en Google Cloud para ayudar a actualizar las Actividades en directo y Dynamic Island cuando un temporizador termina mientras la app no está abierta.',
        },
        {
          q: '¿Cómo cancelo una sesión si el Modo estricto está activado?',
          a: 'No puedes. Esa es la finalidad del Modo estricto. Si lo activas, el botón "Finalizar sesión" queda desactivado para evitar que abandones tu bloque de trabajo profundo. Debes esperar a que termine el temporizador para desbloquear las apps protegidas.',
        },
        {
          q: '¿Por qué no aparece la Actividad en directo en Dynamic Island?',
          a: 'Comprueba que utilizas iOS 18 o una versión posterior y que las Actividades en directo están activadas para Zone en la app Ajustes del iPhone (Ajustes &gt; Zone &gt; Actividades en directo).',
        },
        {
          q: '¿Cómo funciona la integración con Salud de Apple?',
          a: 'Si la activas en Ajustes, Zone puede guardar tus sesiones de trabajo profundo completadas en la app Salud de Apple como "minutos de atención plena". Solo solicitamos permiso de <em>escritura</em>, lo que significa que no podemos leer tus métricas de salud personales. Si las sesiones no se sincronizan, revisa <strong>Ajustes de iOS &gt; Salud &gt; Acceso a datos y dispositivos &gt; Zone</strong> para comprobar que el permiso está concedido.',
        },
      ],
    },
    privacy: {
      title: 'Política de privacidad - Zone Focus App',
      description: 'Política de privacidad de Zone: datos de concentración con conocimiento cero y programación mínima de Actividades en directo.',
      headerTitle: 'Política de privacidad',
      effectiveDate: 'Fecha de entrada en vigor: 12 de mayo de 2026',
      translationNotice: 'Esta versión localizada sigue fielmente el texto fuente en inglés para mantener la misma información y alcance.',
      sections: [
        {
          title: '1. Arquitectura de conocimiento cero',
          body: 'Zone se basa en un modelo estricto de privacidad de "conocimiento cero" para tus datos de concentración. No exigimos una cuenta, no rastreamos el uso que haces de las apps, no supervisamos tu tiempo de pantalla y no recopilamos analíticas sobre tu comportamiento.',
        },
        {
          title: '2. Controles Familiares de Apple',
          body: 'Para ofrecer sus funciones principales de bloqueo de distracciones, Zone utiliza las API nativas FamilyControls y ManagedSettings de Apple.',
          items: [
            '<strong class="text-gray-200">Procesamiento local:</strong> La lista de aplicaciones, sitios web y categorías que eliges bloquear se cifra y se gestiona mediante iOS.',
            '<strong class="text-gray-200">Sin acceso del desarrollador:</strong> No podemos ver, leer ni acceder a los nombres de las apps, sitios web o categorías que seleccionas. Estos datos de selección nunca salen de tu dispositivo.',
          ],
        },
        {
          title: '3. Recopilación y almacenamiento de datos',
          body: 'Zone no recopila datos de cuenta, identidad, publicidad, analíticas, selección de apps ni tiempo de pantalla.',
          items: [
            'Tu historial de sesiones de concentración, tiempo total recuperado, datos de rachas, estadísticas y resúmenes semanales se guardan localmente en tu dispositivo.',
            'No utilizamos SDK de analíticas de terceros para rastrear tu comportamiento o tus interacciones en pantalla.',
            'No vendemos, alquilamos ni compartimos tus datos personales con anunciantes ni intermediarios de datos.',
          ],
        },
        {
          title: '4. Actividades en directo y Dynamic Island',
          body: 'Zone utiliza el sistema de Actividades en directo de Apple para mantener actualizado el temporizador de la pantalla bloqueada y Dynamic Island. Para poder actualizar la finalización cuando la app no está abierta, Zone envía una carga mínima de programación a nuestro backend de Google Cloud.',
          items: [
            '<strong class="text-gray-200">Qué se envía:</strong> el token push de la Actividad en directo, los segundos restantes del temporizador, el estado de ejecución o finalización y el entorno de APNs.',
            '<strong class="text-gray-200">Qué no se envía:</strong> tu lista de apps bloqueadas, sitios web, categorías de apps, historial de concentración, rachas, estadísticas, datos de Salud de Apple, nombre, dirección de correo electrónico ni información de cuenta.',
            '<strong class="text-gray-200">Finalidad:</strong> estos datos se utilizan únicamente para programar y entregar actualizaciones de Actividades en directo mediante Apple Push Notification service.',
          ],
        },
        {
          title: '5. Integración con Salud de Apple',
          body: 'Zone ofrece una función opcional para guardar tus sesiones de trabajo profundo completadas en la app Salud de Apple como "minutos de atención plena".',
          items: [
            '<strong class="text-gray-200">Solo escritura local:</strong> Zone solo solicita permiso para <em>escribir</em> minutos de atención plena en tu base de datos local de Salud de Apple. No leemos tus demás métricas de salud.',
            '<strong class="text-gray-200">Sin transmisión:</strong> tus datos de Salud de Apple nunca se transmiten a nuestros servidores.',
            '<strong class="text-gray-200">Estrictamente privado:</strong> nunca venderemos, compartiremos ni utilizaremos tus datos de Salud de Apple para publicidad, marketing ni fines de intermediación de datos.',
          ],
        },
        {
          title: '6. Cambios en esta política',
          body: 'Si en el futuro introducimos funciones opcionales que requieran tratamiento de datos adicional o sincronización, actualizaremos esta política, y dichas funciones requerirán tu consentimiento explícito y previo cuando corresponda.',
        },
        {
          title: '7. Contacto',
          body: 'Si tienes preguntas sobre nuestras prácticas de privacidad, escríbenos a <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
        },
      ],
    },
  },
  'es-MX': {
    common: {
      support: 'Soporte',
      privacy: 'Privacidad',
      privacyPolicy: 'Política de privacidad',
      language: 'Idioma',
      rights: 'Todos los derechos reservados.',
      supportSubject: 'Solicitud de soporte de Zone',
    },
    home: {
      title: 'Zone - Recupera tu concentración',
      description: 'El temporizador de concentración sin concesiones para profesionales. Bloquea apps que te distraen y recupera tu tiempo.',
      heroTitle: 'Silencia el <br><span class="text-gray-500">ruido.</span>',
      heroBody: 'El temporizador de concentración sin concesiones para profesionales. Bloquea físicamente tus apps más distractoras y aprovecha la arquitectura nativa de iOS para mantenerte en estado de concentración.',
      appStoreCta: 'Descargar en App Store',
      timerAlt: 'Interfaz del temporizador de Zone',
      appPickerTitle: 'Elige tus batallas.',
      appPickerBody: 'Selecciona exactamente las apps y sitios web que te sacan de tu flujo de trabajo. Zone usa los frameworks nativos de Tiempo en pantalla de Apple para ocultar de forma segura tus mayores distracciones digitales en cuanto empieza una sesión.',
      appPickerAlt: 'Selección de apps en Zone',
      strictTitle: 'Aplicación estricta.',
      strictBody: 'Los temporizadores normales solo suenan. Zone bloquea distracciones durante tu sesión. Cuando activas el Modo estricto, se deshabilitan la pausa y la cancelación dentro de la app para que tu bloque de trabajo profundo permanezca protegido hasta que termine el temporizador.',
      strictAlt: 'Configuración del Modo estricto de Zone',
      protectedTitle: 'Concentración protegida.',
      protectedBody: 'Cuando estás en Zone, tu iPhone se transforma en una herramienta dedicada a la productividad. Protegemos tu atención para que te enfoques, hagas el trabajo y construyas impulso.',
      protectedAlt: 'Sesión activa de Zone',
      privacyTitle: 'Tu concentración, <br>tu privacidad.',
      privacyBody: 'Zone utiliza un modelo de privacidad de conocimiento cero para tus selecciones de apps y tu historial de concentración. No podemos ver, rastrear ni monitorear las apps específicas que bloqueas. Solo para las Live Activities, Zone envía el estado mínimo del temporizador necesario para actualizar tu pantalla bloqueada y Dynamic Island.',
      privacyLink: 'Lee nuestra Política de privacidad estricta',
      privacyAlt: 'Arquitectura de conocimiento cero de Zone',
      insightsTitle: 'Recupera tu tiempo.',
      insightsBody: 'Construye impulso siguiendo tus rachas diarias. Revisa tu historial de trabajo profundo, ve cuántas veces intervino Zone y, si quieres, sincroniza tus sesiones completadas directamente con Apple Health como Mindful Minutes.',
      insightsAlt: 'Panel de estadísticas de Zone',
      dailyStreaks: 'Rachas diarias',
      appleHealthSync: 'Sincronización con Apple Health',
    },
    support: {
      title: 'Soporte - Zone Focus App',
      description: 'Ayuda y soporte para Zone: recupera tu concentración.',
      headerTitle: '¿Cómo podemos ayudarte?',
      headerSubtitle: 'Soporte y preguntas frecuentes de Zone.',
      contactTitle: 'Contactar a soporte',
      contactBody: '¿Tienes problemas o quieres pedir una función? Escríbele directamente al desarrollador.',
      emailCta: 'Enviar correo a soporte',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Por qué Zone necesita permisos de Tiempo en pantalla?',
          a: 'Zone utiliza las API nativas FamilyControls y DeviceActivity de Apple para impedir que abras apps que te distraen mientras una sesión de concentración está activa. Este permiso es necesario para que el bloqueo de apps funcione de forma nativa en iOS.',
        },
        {
          q: '¿Pueden ver qué apps estoy bloqueando?',
          a: 'No. Zone funciona con un modelo estricto de privacidad de conocimiento cero para la selección y el bloqueo de apps. Los frameworks de Apple gestionan la selección de apps localmente en tu dispositivo, y no podemos ver, leer ni acceder a los nombres de las apps, sitios web o categorías que bloqueas. Solo para las Live Activities, Zone envía una carga mínima de programación del temporizador, como se describe en la Política de privacidad.',
        },
        {
          q: '¿Zone usa un servidor?',
          a: 'Zone no usa un servidor para cuentas, analíticas, selecciones de apps bloqueadas, historial de concentración, rachas, estadísticas, resúmenes semanales ni datos de Apple Health. Solo se usa un programador mínimo en Google Cloud para ayudar a actualizar las Live Activities y Dynamic Island cuando un temporizador termina mientras la app no está abierta.',
        },
        {
          q: '¿Cómo cancelo una sesión si el Modo estricto está activado?',
          a: 'No puedes. Esa es la finalidad del Modo estricto. Si lo activas, el botón "Finalizar sesión" se deshabilita para evitar que abandones tu bloque de trabajo profundo. Debes esperar a que termine el temporizador para desbloquear las apps protegidas.',
        },
        {
          q: '¿Por qué no aparece la Live Activity en Dynamic Island?',
          a: 'Asegúrate de usar iOS 18 o posterior y revisa que las Live Activities estén activadas para Zone en la app Configuración del iPhone (Configuración &gt; Zone &gt; Live Activities).',
        },
        {
          q: '¿Cómo funciona la integración con Apple Health?',
          a: 'Si la activas en Configuración, Zone puede guardar tus sesiones de trabajo profundo completadas en la app Apple Health como "Mindful Minutes". Solo solicitamos permiso de <em>escritura</em>, lo que significa que no podemos leer tus métricas de salud personales. Si las sesiones no se sincronizan, revisa <strong>Configuración de iOS &gt; Salud &gt; Acceso a datos y dispositivos &gt; Zone</strong> para confirmar que el permiso esté concedido.',
        },
      ],
    },
    privacy: {
      title: 'Política de privacidad - Zone Focus App',
      description: 'Política de privacidad de Zone: datos de concentración con conocimiento cero y programación mínima de Live Activities.',
      headerTitle: 'Política de privacidad',
      effectiveDate: 'Fecha de entrada en vigor: 12 de mayo de 2026',
      translationNotice: 'Esta versión localizada sigue fielmente el texto fuente en inglés para conservar la misma información y alcance.',
      sections: [
        {
          title: '1. Arquitectura de conocimiento cero',
          body: 'Zone está construido sobre un modelo estricto de privacidad de "conocimiento cero" para tus datos de concentración. No requerimos una cuenta, no rastreamos el uso que haces de las apps, no monitoreamos tu tiempo en pantalla y no recopilamos analíticas sobre tu comportamiento.',
        },
        {
          title: '2. Controles Familiares de Apple',
          body: 'Para ofrecer sus funciones principales de bloqueo de distracciones, Zone utiliza las API nativas FamilyControls y ManagedSettings de Apple.',
          items: [
            '<strong class="text-gray-200">Procesamiento local:</strong> La lista de aplicaciones, sitios web y categorías que eliges bloquear se cifra y se gestiona mediante iOS.',
            '<strong class="text-gray-200">Sin acceso del desarrollador:</strong> No podemos ver, leer ni acceder a los nombres de las apps, sitios web o categorías que seleccionas. Estos datos de selección nunca salen de tu dispositivo.',
          ],
        },
        {
          title: '3. Recopilación y almacenamiento de datos',
          body: 'Zone no recopila datos de cuenta, identidad, publicidad, analíticas, selección de apps ni tiempo en pantalla.',
          items: [
            'Tu historial de sesiones de concentración, tiempo total recuperado, datos de rachas, estadísticas y resúmenes semanales se guardan localmente en tu dispositivo.',
            'No utilizamos SDK de analíticas de terceros para rastrear tu comportamiento o tus interacciones en pantalla.',
            'No vendemos, rentamos ni compartimos tus datos personales con anunciantes ni intermediarios de datos.',
          ],
        },
        {
          title: '4. Live Activities y Dynamic Island',
          body: 'Zone utiliza el sistema Live Activity de Apple para mantener actualizado el temporizador en tu pantalla bloqueada y Dynamic Island. Para permitir actualizaciones de finalización cuando la app no está abierta, Zone envía una carga mínima de programación a nuestro backend de Google Cloud.',
          items: [
            '<strong class="text-gray-200">Qué se envía:</strong> el token push de la Live Activity, los segundos restantes del temporizador, el estado en ejecución o de finalización y el entorno de APNs.',
            '<strong class="text-gray-200">Qué no se envía:</strong> tu lista de apps bloqueadas, sitios web, categorías de apps, historial de concentración, rachas, estadísticas, datos de Apple Health, nombre, dirección de correo electrónico ni información de cuenta.',
            '<strong class="text-gray-200">Finalidad:</strong> estos datos se utilizan únicamente para programar y entregar actualizaciones de Live Activities mediante Apple Push Notification service.',
          ],
        },
        {
          title: '5. Integración con Apple Health',
          body: 'Zone ofrece una función opcional para guardar tus sesiones de trabajo profundo completadas en la app Apple Health como "Mindful Minutes".',
          items: [
            '<strong class="text-gray-200">Solo escritura local:</strong> Zone solo solicita permiso para <em>escribir</em> Mindful Minutes en tu base de datos local de Apple Health. No leemos tus demás métricas de salud.',
            '<strong class="text-gray-200">Sin transmisión:</strong> tus datos de Apple Health nunca se transmiten a nuestros servidores.',
            '<strong class="text-gray-200">Estrictamente privado:</strong> nunca venderemos, compartiremos ni utilizaremos tus datos de Apple Health para publicidad, marketing ni fines de intermediación de datos.',
          ],
        },
        {
          title: '6. Cambios en esta política',
          body: 'Si en el futuro introducimos funciones opcionales que requieran procesamiento adicional de datos o sincronización, actualizaremos esta política, y esas funciones requerirán tu consentimiento explícito y previo cuando corresponda.',
        },
        {
          title: '7. Contacto',
          body: 'Si tienes preguntas sobre nuestras prácticas de privacidad, contáctanos en <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
        },
      ],
    },
  },
  'pt-BR': {
    common: {
      support: 'Suporte',
      privacy: 'Privacidade',
      privacyPolicy: 'Política de Privacidade',
      language: 'Idioma',
      rights: 'Todos os direitos reservados.',
      supportSubject: 'Solicitação de suporte do Zone',
    },
    home: {
      title: 'Zone - Recupere seu foco',
      description: 'O timer de foco sem concessões para profissionais. Bloqueie apps que distraem e recupere seu tempo.',
      heroTitle: 'Silencie o <br><span class="text-gray-500">ruído.</span>',
      heroBody: 'O timer de foco sem concessões para profissionais. Bloqueie fisicamente seus apps mais distrativos e aproveite a arquitetura nativa do iOS para se manter em estado de foco.',
      appStoreCta: 'Baixar na App Store',
      timerAlt: 'Interface do timer do Zone',
      appPickerTitle: 'Escolha suas batalhas.',
      appPickerBody: 'Selecione exatamente os apps e sites que tiram você do fluxo de trabalho. O Zone usa os frameworks nativos de Tempo de Uso da Apple para ocultar com segurança suas maiores distrações digitais assim que uma sessão começa.',
      appPickerAlt: 'Seleção de apps no Zone',
      strictTitle: 'Aplicação rígida.',
      strictBody: 'Timers comuns apenas tocam. O Zone bloqueia distrações durante a sessão. Quando o Modo Estrito está ativado, pausa e cancelamento dentro do app ficam desativados para que seu bloco de trabalho profundo permaneça protegido até o timer terminar.',
      strictAlt: 'Ajustes do Modo Estrito do Zone',
      protectedTitle: 'Foco protegido.',
      protectedBody: 'Quando você está no Zone, seu iPhone se transforma em uma ferramenta dedicada à produtividade. Protegemos sua atenção para que você entre no ritmo, faça o trabalho e mantenha o impulso.',
      protectedAlt: 'Sessão ativa do Zone',
      privacyTitle: 'Seu foco, <br>sua privacidade.',
      privacyBody: 'O Zone usa um modelo de privacidade de conhecimento zero para suas seleções de apps e seu histórico de foco. Não conseguimos ver, rastrear nem monitorar os apps específicos que você bloqueia. Somente para Live Activities, o Zone envia o estado mínimo do timer necessário para atualizar a Tela Bloqueada e a Dynamic Island.',
      privacyLink: 'Leia nossa Política de Privacidade rigorosa',
      privacyAlt: 'Arquitetura de conhecimento zero do Zone',
      insightsTitle: 'Recupere seu tempo.',
      insightsBody: 'Construa impulso acompanhando suas sequências diárias. Monitore seu histórico de trabalho profundo, veja quantas vezes o Zone interveio e, se quiser, sincronize suas sessões concluídas diretamente com o Apple Health como Mindful Minutes.',
      insightsAlt: 'Painel de estatísticas do Zone',
      dailyStreaks: 'Sequências diárias',
      appleHealthSync: 'Sincronização com Apple Health',
    },
    support: {
      title: 'Suporte - Zone Focus App',
      description: 'Ajuda e suporte para o Zone: recupere seu foco.',
      headerTitle: 'Como podemos ajudar?',
      headerSubtitle: 'Suporte e perguntas frequentes sobre o Zone.',
      contactTitle: 'Entrar em contato com o suporte',
      contactBody: 'Está com problemas ou quer pedir um recurso? Fale diretamente com o desenvolvedor.',
      emailCta: 'Enviar e-mail ao suporte',
      faqTitle: 'Perguntas frequentes',
      faqs: [
        {
          q: 'Por que o Zone precisa de permissões de Tempo de Uso?',
          a: 'O Zone usa as APIs nativas FamilyControls e DeviceActivity da Apple para impedir que você abra apps que distraem enquanto uma sessão de foco está ativa. Essa permissão é necessária para que o bloqueio de apps funcione de forma nativa no iOS.',
        },
        {
          q: 'Vocês conseguem ver quais apps eu bloqueio?',
          a: 'Não. O Zone funciona com um modelo estrito de privacidade de conhecimento zero para seleção e bloqueio de apps. Os frameworks da Apple lidam com a seleção de apps localmente no seu dispositivo, e não conseguimos ver, ler nem acessar os nomes dos apps, sites ou categorias que você bloqueia. Somente para Live Activities, o Zone envia uma carga mínima de agendamento do timer, conforme descrito na Política de Privacidade.',
        },
        {
          q: 'O Zone usa um servidor?',
          a: 'O Zone não usa servidor para contas, analytics, seleções de apps bloqueados, histórico de foco, sequências, estatísticas, resumos semanais ou dados do Apple Health. Um agendador mínimo no Google Cloud é usado apenas para ajudar a atualizar Live Activities e Dynamic Island quando um timer termina enquanto o app não está aberto.',
        },
        {
          q: 'Como cancelo uma sessão se o Modo Estrito estiver ativado?',
          a: 'Você não cancela. Esse é o objetivo do Modo Estrito. Se você ativar o Modo Estrito, o botão "Encerrar sessão" é desativado para impedir que você abandone seu bloco de trabalho profundo. É preciso esperar o timer terminar para desbloquear os apps protegidos.',
        },
        {
          q: 'Por que a Live Activity não aparece na Dynamic Island?',
          a: 'Verifique se você está usando iOS 18 ou posterior e se as Live Activities estão ativadas para o Zone no app Ajustes do iPhone (Ajustes &gt; Zone &gt; Live Activities).',
        },
        {
          q: 'Como funciona a integração com o Apple Health?',
          a: 'Se ativado em Ajustes, o Zone pode salvar suas sessões concluídas de trabalho profundo no app Apple Health como "Mindful Minutes". Solicitamos apenas acesso de <em>gravação</em>, ou seja, não conseguimos ler suas métricas pessoais de saúde. Se as sessões não estiverem sincronizando, confira <strong>Ajustes do iOS &gt; Saúde &gt; Acesso a Dados e Dispositivos &gt; Zone</strong> para garantir que a permissão foi concedida.',
        },
      ],
    },
    privacy: {
      title: 'Política de Privacidade - Zone Focus App',
      description: 'Política de Privacidade do Zone: dados de foco com conhecimento zero e agendamento mínimo de Live Activities.',
      headerTitle: 'Política de Privacidade',
      effectiveDate: 'Data de vigência: 12 de maio de 2026',
      translationNotice: 'Esta versão localizada segue fielmente o texto-fonte em inglês para manter as mesmas informações e o mesmo escopo.',
      sections: [
        {
          title: '1. Arquitetura de conhecimento zero',
          body: 'O Zone foi criado com um modelo estrito de privacidade de "conhecimento zero" para seus dados de foco. Não exigimos uma conta, não rastreamos seu uso de apps, não monitoramos seu tempo de tela e não coletamos analytics sobre seu comportamento.',
        },
        {
          title: '2. Controles Familiares da Apple',
          body: 'Para oferecer seus principais recursos de bloqueio de distrações, o Zone usa as APIs nativas FamilyControls e ManagedSettings da Apple.',
          items: [
            '<strong class="text-gray-200">Processamento local:</strong> A lista de aplicativos, sites e categorias que você escolhe bloquear é criptografada e gerenciada pelo iOS.',
            '<strong class="text-gray-200">Sem acesso do desenvolvedor:</strong> Não conseguimos ver, ler nem acessar os nomes dos apps, sites ou categorias que você seleciona. Esses dados de seleção nunca saem do seu dispositivo.',
          ],
        },
        {
          title: '3. Coleta e armazenamento de dados',
          body: 'O Zone não coleta dados de conta, identidade, publicidade, analytics, seleção de apps ou tempo de tela.',
          items: [
            'Seu histórico de sessões de foco, tempo total recuperado, dados de sequência, estatísticas e resumos semanais são salvos localmente no seu dispositivo.',
            'Não usamos SDKs de analytics de terceiros para rastrear seu comportamento ou suas interações na tela.',
            'Não vendemos, alugamos nem compartilhamos seus dados pessoais com anunciantes ou corretores de dados.',
          ],
        },
        {
          title: '4. Live Activities e Dynamic Island',
          body: 'O Zone usa o sistema Live Activity da Apple para manter o timer da Tela Bloqueada e da Dynamic Island atualizado. Para oferecer suporte a atualizações de conclusão quando o app não está aberto, o Zone envia uma carga mínima de agendamento para nosso backend no Google Cloud.',
          items: [
            '<strong class="text-gray-200">O que é enviado:</strong> o token push da Live Activity, os segundos restantes do timer, o estado em execução ou de conclusão e o ambiente de APNs.',
            '<strong class="text-gray-200">O que não é enviado:</strong> sua lista de apps bloqueados, sites, categorias de apps, histórico de foco, sequências, estatísticas, dados do Apple Health, nome, endereço de e-mail ou informações de conta.',
            '<strong class="text-gray-200">Finalidade:</strong> esses dados são usados apenas para agendar e entregar atualizações de Live Activities por meio do Apple Push Notification service.',
          ],
        },
        {
          title: '5. Integração com Apple Health',
          body: 'O Zone oferece um recurso opcional para salvar suas sessões concluídas de trabalho profundo no app Apple Health como "Mindful Minutes".',
          items: [
            '<strong class="text-gray-200">Apenas gravação local:</strong> O Zone solicita permissão apenas para <em>gravar</em> Mindful Minutes no banco de dados local do Apple Health. Não lemos suas outras métricas de saúde.',
            '<strong class="text-gray-200">Sem transmissão:</strong> seus dados do Apple Health nunca são transmitidos aos nossos servidores.',
            '<strong class="text-gray-200">Estritamente privado:</strong> nunca venderemos, compartilharemos nem usaremos seus dados do Apple Health para publicidade, marketing ou fins de corretagem de dados.',
          ],
        },
        {
          title: '6. Alterações nesta política',
          body: 'Se introduzirmos recursos opcionais no futuro que exijam processamento adicional de dados ou sincronização, esta política será atualizada, e esses recursos exigirão seu consentimento explícito e prévio quando aplicável.',
        },
        {
          title: '7. Contato',
          body: 'Se você tiver dúvidas sobre nossas práticas de privacidade, entre em contato pelo e-mail <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
        },
      ],
    },
  },
  fr: {
    common: {
      support: 'Assistance',
      privacy: 'Confidentialité',
      privacyPolicy: 'Politique de confidentialité',
      language: 'Langue',
      rights: 'Tous droits réservés.',
      supportSubject: 'Demande d’assistance Zone',
    },
    home: {
      title: 'Zone - Reprenez le contrôle de votre attention',
      description: 'Le minuteur de concentration sans compromis pour les professionnels. Bloquez les apps distrayantes et reprenez votre temps.',
      heroTitle: 'Faites taire le <br><span class="text-gray-500">bruit.</span>',
      heroBody: 'Le minuteur de concentration sans compromis pour les professionnels. Bloquez concrètement vos apps les plus distrayantes et utilisez l’architecture native d’iOS pour rester dans votre état de concentration.',
      appStoreCta: 'Télécharger dans l’App Store',
      timerAlt: 'Interface du minuteur Zone',
      appPickerTitle: 'Choisissez vos combats.',
      appPickerBody: 'Ciblez précisément les apps et sites web qui vous sortent de votre flux de travail. Zone utilise les frameworks natifs Temps d’écran d’Apple pour masquer en toute sécurité vos plus grandes distractions numériques dès le début d’une session.',
      appPickerAlt: 'Sélection d’apps dans Zone',
      strictTitle: 'Verrouillage strict.',
      strictBody: 'Les minuteurs classiques se contentent de sonner. Zone bloque les distractions pendant votre session. Lorsque le Mode strict est activé, la pause et l’annulation dans l’app sont désactivées afin que votre bloc de travail profond reste protégé jusqu’à la fin du minuteur.',
      strictAlt: 'Réglages du Mode strict de Zone',
      protectedTitle: 'Concentration protégée.',
      protectedBody: 'Quand vous êtes dans Zone, votre iPhone devient un outil dédié à la productivité. Nous protégeons votre attention pour que vous puissiez vous lancer, faire le travail et garder l’élan.',
      protectedAlt: 'Session active Zone',
      privacyTitle: 'Votre concentration, <br>vos données.',
      privacyBody: 'Zone utilise un modèle de confidentialité à connaissance zéro pour vos sélections d’apps et votre historique de concentration. Nous ne pouvons pas voir, suivre ni surveiller les apps précises que vous bloquez. Pour les Live Activities uniquement, Zone envoie l’état minimal du minuteur nécessaire pour mettre à jour l’écran verrouillé et Dynamic Island.',
      privacyLink: 'Lire notre Politique de confidentialité stricte',
      privacyAlt: 'Architecture à connaissance zéro de Zone',
      insightsTitle: 'Reprenez votre temps.',
      insightsBody: 'Créez un élan durable en suivant vos séries quotidiennes. Consultez votre historique de travail profond, voyez combien de fois Zone est intervenu et, si vous le souhaitez, synchronisez vos sessions terminées avec Apple Health sous forme de Mindful Minutes.',
      insightsAlt: 'Tableau de bord d’insights Zone',
      dailyStreaks: 'Séries quotidiennes',
      appleHealthSync: 'Synchronisation Apple Health',
    },
    support: {
      title: 'Assistance - Zone Focus App',
      description: 'Aide et assistance pour Zone : reprenez le contrôle de votre attention.',
      headerTitle: 'Comment pouvons-nous vous aider ?',
      headerSubtitle: 'Assistance et questions fréquentes pour Zone.',
      contactTitle: 'Contacter l’assistance',
      contactBody: 'Vous rencontrez un problème ou souhaitez demander une fonctionnalité ? Contactez directement le développeur.',
      emailCta: 'Envoyer un e-mail',
      faqTitle: 'Questions fréquentes',
      faqs: [
        {
          q: 'Pourquoi Zone a-t-il besoin des autorisations Temps d’écran ?',
          a: 'Zone utilise les API natives FamilyControls et DeviceActivity d’Apple pour vous empêcher d’ouvrir des apps distrayantes pendant une session de concentration active. Cette autorisation est nécessaire pour que le masquage des apps fonctionne nativement sur iOS.',
        },
        {
          q: 'Pouvez-vous voir quelles apps je bloque ?',
          a: 'Non. Zone fonctionne avec un modèle strict de confidentialité à connaissance zéro pour la sélection et le masquage des apps. Les frameworks d’Apple gèrent la sélection des apps localement sur votre appareil, et nous ne pouvons pas voir, lire ni accéder aux noms des apps, sites web ou catégories que vous bloquez. Pour les Live Activities uniquement, Zone envoie une charge minimale de planification du minuteur, comme décrit dans la Politique de confidentialité.',
        },
        {
          q: 'Zone utilise-t-il un serveur ?',
          a: 'Zone n’utilise pas de serveur pour les comptes, l’analytics, les sélections d’apps bloquées, l’historique de concentration, les séries, les insights, les résumés hebdomadaires ou les données Apple Health. Un planificateur minimal sur Google Cloud est utilisé uniquement pour aider à mettre à jour les Live Activities et Dynamic Island lorsqu’un minuteur se termine alors que l’app n’est pas ouverte.',
        },
        {
          q: 'Comment annuler une session si le Mode strict est activé ?',
          a: 'Vous ne pouvez pas. C’est le principe du Mode strict. Si vous l’activez, le bouton "Terminer la session" est désactivé pour vous empêcher d’abandonner votre bloc de travail profond. Vous devez attendre la fin du minuteur pour déverrouiller les apps masquées.',
        },
        {
          q: 'Pourquoi la Live Activity n’apparaît-elle pas dans Dynamic Island ?',
          a: 'Vérifiez que vous utilisez iOS 18 ou une version ultérieure, et que les Live Activities sont activées pour Zone dans l’app Réglages de votre iPhone (Réglages &gt; Zone &gt; Live Activities).',
        },
        {
          q: 'Comment fonctionne l’intégration avec Apple Health ?',
          a: 'Si elle est activée dans les réglages, Zone peut enregistrer vos sessions de travail profond terminées dans l’app Apple Health en tant que "Mindful Minutes". Nous demandons uniquement un accès en <em>écriture</em>, ce qui signifie que nous ne pouvons pas lire vos métriques de santé personnelles. Si les sessions ne se synchronisent pas, vérifiez <strong>Réglages iOS &gt; Santé &gt; Accès aux données et appareils &gt; Zone</strong> pour vous assurer que l’autorisation est accordée.',
        },
      ],
    },
    privacy: {
      title: 'Politique de confidentialité - Zone Focus App',
      description: 'Politique de confidentialité de Zone : données de concentration à connaissance zéro et planification minimale des Live Activities.',
      headerTitle: 'Politique de confidentialité',
      effectiveDate: 'Date d’entrée en vigueur : 12 mai 2026',
      translationNotice: 'Cette version localisée suit fidèlement le texte source anglais afin de conserver les mêmes informations et le même périmètre.',
      sections: [
        {
          title: '1. Architecture à connaissance zéro',
          body: 'Zone repose sur un modèle strict de confidentialité à "connaissance zéro" pour vos données de concentration. Nous n’exigeons pas de compte, nous ne suivons pas votre utilisation des apps, nous ne surveillons pas votre temps d’écran et nous ne collectons pas d’analytics sur votre comportement.',
        },
        {
          title: '2. Contrôles familiaux Apple',
          body: 'Pour fournir ses fonctions principales de blocage des distractions, Zone utilise les API natives FamilyControls et ManagedSettings d’Apple.',
          items: [
            '<strong class="text-gray-200">Traitement local :</strong> la liste des applications, sites web et catégories que vous choisissez de bloquer est chiffrée et gérée par iOS.',
            '<strong class="text-gray-200">Aucun accès développeur :</strong> nous ne pouvons pas voir, lire ni accéder aux noms des apps, sites web ou catégories que vous sélectionnez. Ces données de sélection ne quittent jamais votre appareil.',
          ],
        },
        {
          title: '3. Collecte et stockage des données',
          body: 'Zone ne collecte aucune donnée de compte, d’identité, de publicité, d’analytics, de sélection d’apps ou de temps d’écran.',
          items: [
            'Votre historique de sessions de concentration, votre temps total récupéré, vos séries, vos insights et vos résumés hebdomadaires sont enregistrés localement sur votre appareil.',
            'Nous n’utilisons pas de SDK d’analytics tiers pour suivre votre comportement ou vos interactions à l’écran.',
            'Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des annonceurs ou des courtiers en données.',
          ],
        },
        {
          title: '4. Live Activities et Dynamic Island',
          body: 'Zone utilise le système Live Activity d’Apple pour maintenir à jour le minuteur de votre écran verrouillé et de Dynamic Island. Pour prendre en charge les mises à jour de fin lorsque l’app n’est pas ouverte, Zone envoie une charge minimale de planification à notre backend Google Cloud.',
          items: [
            '<strong class="text-gray-200">Ce qui est envoyé :</strong> le jeton push de la Live Activity, les secondes restantes du minuteur, l’état en cours ou terminé, et l’environnement APNs.',
            '<strong class="text-gray-200">Ce qui n’est pas envoyé :</strong> votre liste d’apps bloquées, les sites web, les catégories d’apps, l’historique de concentration, les séries, les insights, les données Apple Health, le nom, l’adresse e-mail ou les informations de compte.',
            '<strong class="text-gray-200">Finalité :</strong> ces données sont utilisées uniquement pour planifier et transmettre les mises à jour de Live Activities via Apple Push Notification service.',
          ],
        },
        {
          title: '5. Intégration Apple Health',
          body: 'Zone propose une fonctionnalité facultative permettant d’enregistrer vos sessions de travail profond terminées dans l’app Apple Health sous forme de "Mindful Minutes".',
          items: [
            '<strong class="text-gray-200">Écriture locale uniquement :</strong> Zone demande seulement l’autorisation d’<em>écrire</em> des Mindful Minutes dans votre base Apple Health locale. Nous ne lisons pas vos autres métriques de santé.',
            '<strong class="text-gray-200">Aucune transmission :</strong> vos données Apple Health ne sont jamais transmises à nos serveurs.',
            '<strong class="text-gray-200">Strictement privé :</strong> nous ne vendrons, ne partagerons ni n’utiliserons jamais vos données Apple Health à des fins publicitaires, marketing ou de courtage de données.',
          ],
        },
        {
          title: '6. Modifications de cette politique',
          body: 'Si nous introduisons à l’avenir des fonctionnalités facultatives nécessitant un traitement ou une synchronisation supplémentaire des données, cette politique sera mise à jour, et ces fonctionnalités nécessiteront votre consentement explicite et préalable lorsque la loi l’exige.',
        },
        {
          title: '7. Contact',
          body: 'Si vous avez des questions sur nos pratiques de confidentialité, contactez-nous à <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
        },
      ],
    },
  },
  de: {
    common: {
      support: 'Support',
      privacy: 'Datenschutz',
      privacyPolicy: 'Datenschutzerklärung',
      language: 'Sprache',
      rights: 'Alle Rechte vorbehalten.',
      supportSubject: 'Support-Anfrage zu Zone',
    },
    home: {
      title: 'Zone - Hol dir deinen Fokus zurück',
      description: 'Der kompromisslose Fokus-Timer für Profis. Blockiere ablenkende Apps und gewinne deine Zeit zurück.',
      heroTitle: 'Schalte den <br><span class="text-gray-500">Lärm aus.</span>',
      heroBody: 'Der kompromisslose Fokus-Timer für Profis. Blockiere deine stärksten Ablenkungs-Apps gezielt und nutze die native iOS-Architektur, um im Fokus zu bleiben.',
      appStoreCta: 'Im App Store laden',
      timerAlt: 'Zone Timer-Oberfläche',
      appPickerTitle: 'Wähle deine Gegner.',
      appPickerBody: 'Wähle genau die Apps und Websites aus, die dich aus deinem Arbeitsfluss reißen. Zone nutzt Apples native Bildschirmzeit-Frameworks, um deine größten digitalen Ablenkungen sicher auszublenden, sobald eine Sitzung beginnt.',
      appPickerAlt: 'App-Auswahl in Zone',
      strictTitle: 'Streng durchgesetzt.',
      strictBody: 'Normale Timer klingeln nur. Zone blockiert Ablenkungen während deiner Sitzung. Wenn der Strikte Modus aktiv ist, sind Pausieren und Abbrechen in der App deaktiviert, damit dein Deep-Work-Block bis zum Ende des Timers geschützt bleibt.',
      strictAlt: 'Einstellungen für den Strikten Modus in Zone',
      protectedTitle: 'Fokus geschützt.',
      protectedBody: 'Wenn du in Zone bist, wird dein iPhone zu einem reinen Produktivitätswerkzeug. Wir schützen deine Aufmerksamkeit, damit du einsteigst, die Arbeit erledigst und Momentum aufbaust.',
      protectedAlt: 'Aktive Sitzung in Zone',
      privacyTitle: 'Dein Fokus, <br>deine Sache.',
      privacyBody: 'Zone nutzt ein Zero-Knowledge-Datenschutzmodell für deine App-Auswahl und deinen Fokusverlauf. Wir können nicht sehen, verfolgen oder überwachen, welche konkreten Apps du blockierst. Nur für Live Activities sendet Zone den minimal nötigen Timer-Status, um Sperrbildschirm und Dynamic Island zu aktualisieren.',
      privacyLink: 'Lies unsere strenge Datenschutzerklärung',
      privacyAlt: 'Zero-Knowledge-Architektur von Zone',
      insightsTitle: 'Gewinne deine Zeit zurück.',
      insightsBody: 'Baue Momentum auf, indem du deine täglichen Serien verfolgst. Sieh dir deinen Deep-Work-Verlauf an, erkenne, wie oft Zone eingegriffen hat, und synchronisiere abgeschlossene Sitzungen optional direkt mit Apple Health als Mindful Minutes.',
      insightsAlt: 'Insights-Dashboard von Zone',
      dailyStreaks: 'Tägliche Serien',
      appleHealthSync: 'Apple Health Sync',
    },
    support: {
      title: 'Support - Zone Focus App',
      description: 'Hilfe und Support für Zone: Hol dir deinen Fokus zurück.',
      headerTitle: 'Wie können wir helfen?',
      headerSubtitle: 'Support und häufige Fragen zu Zone.',
      contactTitle: 'Support kontaktieren',
      contactBody: 'Hast du Probleme oder möchtest du eine Funktion vorschlagen? Schreib dem Entwickler direkt.',
      emailCta: 'Support per E-Mail kontaktieren',
      faqTitle: 'Häufig gestellte Fragen',
      faqs: [
        {
          q: 'Warum benötigt Zone Bildschirmzeit-Berechtigungen?',
          a: 'Zone nutzt Apples native APIs FamilyControls und DeviceActivity, um zu verhindern, dass du ablenkende Apps öffnest, während eine Fokus-Sitzung aktiv ist. Diese Berechtigung ist erforderlich, damit App-Abschirmung nativ unter iOS funktioniert.',
        },
        {
          q: 'Könnt ihr sehen, welche Apps ich blockiere?',
          a: 'Nein. Zone arbeitet mit einem strikten Zero-Knowledge-Datenschutzmodell für App-Auswahl und Abschirmung. Apples Frameworks verarbeiten die App-Auswahl lokal auf deinem Gerät, und wir können die Namen der Apps, Websites oder Kategorien, die du blockierst, nicht sehen, lesen oder abrufen. Nur für Live Activities sendet Zone eine minimale Timer-Planungsnutzlast, wie in der Datenschutzerklärung beschrieben.',
        },
        {
          q: 'Verwendet Zone einen Server?',
          a: 'Zone verwendet keinen Server für Konten, Analysen, blockierte App-Auswahlen, Fokusverlauf, Serien, Insights, Wochenzusammenfassungen oder Apple-Health-Daten. Ein minimaler Google-Cloud-Planer wird nur verwendet, um Live Activities und Dynamic Island zu aktualisieren, wenn ein Timer endet, während die App nicht geöffnet ist.',
        },
        {
          q: 'Wie breche ich eine Sitzung ab, wenn der Strikte Modus aktiviert ist?',
          a: 'Das geht nicht. Genau darum geht es beim Strikten Modus. Wenn du den Strikten Modus aktivierst, wird die Schaltfläche "Sitzung beenden" deaktiviert, damit du deinen Deep-Work-Block nicht abbrichst. Du musst warten, bis der Timer endet, um die abgeschirmten Apps wieder freizugeben.',
        },
        {
          q: 'Warum wird die Live Activity nicht in meiner Dynamic Island angezeigt?',
          a: 'Stelle sicher, dass du iOS 18 oder neuer verwendest, und prüfe, ob Live Activities für Zone in den iPhone-Einstellungen aktiviert sind (Einstellungen &gt; Zone &gt; Live Activities).',
        },
        {
          q: 'Wie funktioniert die Integration mit Apple Health?',
          a: 'Wenn sie in den Einstellungen aktiviert ist, kann Zone deine abgeschlossenen Deep-Work-Sitzungen in der Apple-Health-App als "Mindful Minutes" speichern. Wir fordern nur <em>Schreibzugriff</em> an, das heißt, wir können deine persönlichen Gesundheitsmetriken nicht lesen. Wenn Sitzungen nicht synchronisiert werden, prüfe <strong>iOS-Einstellungen &gt; Health &gt; Datenzugriff &amp; Geräte &gt; Zone</strong>, um sicherzustellen, dass die Berechtigung erteilt wurde.',
        },
      ],
    },
    privacy: {
      title: 'Datenschutzerklärung - Zone Focus App',
      description: 'Datenschutzerklärung für Zone: Zero-Knowledge-Fokusdaten mit minimaler Live-Activity-Planung.',
      headerTitle: 'Datenschutzerklärung',
      effectiveDate: 'Gültig ab: 12. Mai 2026',
      translationNotice: 'Diese lokalisierte Fassung folgt dem englischen Ausgangstext genau, damit Informationen und Umfang unverändert bleiben.',
      sections: [
        {
          title: '1. Zero-Knowledge-Architektur',
          body: 'Zone basiert auf einem strikten "Zero-Knowledge"-Datenschutzmodell für deine Fokusdaten. Wir verlangen kein Konto, verfolgen deine App-Nutzung nicht, überwachen deine Bildschirmzeit nicht und erfassen keine Analysen zu deinem Verhalten.',
        },
        {
          title: '2. Apple Family Controls',
          body: 'Um die zentralen Funktionen zum Blockieren von Ablenkungen bereitzustellen, nutzt Zone Apples native APIs FamilyControls und ManagedSettings.',
          items: [
            '<strong class="text-gray-200">Lokale Verarbeitung:</strong> Die Liste der Anwendungen, Websites und Kategorien, die du blockieren möchtest, wird von iOS verschlüsselt und verwaltet.',
            '<strong class="text-gray-200">Kein Entwicklerzugriff:</strong> Wir können die Namen der Apps, Websites oder Kategorien, die du auswählst, nicht sehen, lesen oder abrufen. Diese Auswahldaten verlassen dein Gerät nie.',
          ],
        },
        {
          title: '3. Datenerhebung und Speicherung',
          body: 'Zone erhebt keine Konto-, Identitäts-, Werbe-, Analyse-, App-Auswahl- oder Bildschirmzeitdaten.',
          items: [
            'Dein Fokus-Sitzungsverlauf, die insgesamt zurückgewonnene Zeit, Seriendaten, Insights und Wochenzusammenfassungen werden lokal auf deinem Gerät gespeichert.',
            'Wir verwenden keine Analyse-SDKs von Drittanbietern, um dein Verhalten oder deine Bildschirminteraktionen zu verfolgen.',
            'Wir verkaufen, vermieten oder teilen deine personenbezogenen Daten nicht mit Werbetreibenden oder Datenhändlern.',
          ],
        },
        {
          title: '4. Live Activities und Dynamic Island',
          body: 'Zone nutzt Apples Live-Activity-System, um den Timer auf deinem Sperrbildschirm und in Dynamic Island aktuell zu halten. Um Abschlussaktualisierungen zu unterstützen, wenn die App nicht geöffnet ist, sendet Zone eine minimale Planungsnutzlast an unser Google-Cloud-Backend.',
          items: [
            '<strong class="text-gray-200">Was gesendet wird:</strong> das Live-Activity-Push-Token, verbleibende Timer-Sekunden, laufender oder abgeschlossener Zustand und die APNs-Umgebung.',
            '<strong class="text-gray-200">Was nicht gesendet wird:</strong> deine Liste blockierter Apps, Websites, App-Kategorien, Fokusverlauf, Serien, Insights, Apple-Health-Daten, Name, E-Mail-Adresse oder Kontoinformationen.',
            '<strong class="text-gray-200">Zweck:</strong> Diese Daten werden ausschließlich verwendet, um Live-Activity-Aktualisierungen über den Apple Push Notification service zu planen und zuzustellen.',
          ],
        },
        {
          title: '5. Apple-Health-Integration',
          body: 'Zone bietet eine optionale Funktion, mit der deine abgeschlossenen Deep-Work-Sitzungen in der Apple-Health-App als "Mindful Minutes" gespeichert werden können.',
          items: [
            '<strong class="text-gray-200">Nur lokales Schreiben:</strong> Zone fordert nur die Berechtigung an, Mindful Minutes in deine lokale Apple-Health-Datenbank zu <em>schreiben</em>. Wir lesen keine anderen Gesundheitsmetriken.',
            '<strong class="text-gray-200">Keine Übertragung:</strong> Deine Apple-Health-Daten werden niemals an unsere Server übertragen.',
            '<strong class="text-gray-200">Streng privat:</strong> Wir werden deine Apple-Health-Daten niemals verkaufen, teilen oder für Werbung, Marketing oder Datenhändlerzwecke verwenden.',
          ],
        },
        {
          title: '6. Änderungen dieser Richtlinie',
          body: 'Wenn wir künftig optionale Funktionen einführen, die eine zusätzliche Datenverarbeitung oder Synchronisierung erfordern, wird diese Richtlinie aktualisiert, und diese Funktionen erfordern, soweit erforderlich, deine ausdrückliche vorherige Zustimmung.',
        },
        {
          title: '7. Kontakt',
          body: 'Wenn du Fragen zu unseren Datenschutzpraktiken hast, kontaktiere uns bitte unter <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
        },
      ],
    },
  },
  it: {
    common: {
      support: 'Supporto',
      privacy: 'Privacy',
      privacyPolicy: 'Informativa sulla privacy',
      language: 'Lingua',
      rights: 'Tutti i diritti riservati.',
      supportSubject: 'Richiesta di supporto per Zone',
    },
    home: {
      title: 'Zone - Ritrova la concentrazione',
      description: 'Il timer di concentrazione senza compromessi per professionisti. Blocca le app che ti distraggono e recupera il tuo tempo.',
      heroTitle: 'Spegni il <br><span class="text-gray-500">rumore.</span>',
      heroBody: 'Il timer di concentrazione senza compromessi per professionisti. Blocca concretamente le app che ti distraggono di più e sfrutta l’architettura nativa di iOS per restare nel flusso.',
      appStoreCta: 'Scarica su App Store',
      timerAlt: 'Interfaccia del timer di Zone',
      appPickerTitle: 'Scegli le tue battaglie.',
      appPickerBody: 'Seleziona esattamente le app e i siti web che ti portano fuori dal flusso di lavoro. Zone usa i framework nativi di Tempo di utilizzo di Apple per nascondere in modo sicuro le tue principali distrazioni digitali appena inizia una sessione.',
      appPickerAlt: 'Selezione delle app in Zone',
      strictTitle: 'Applicazione rigorosa.',
      strictBody: 'I timer tradizionali si limitano a suonare. Zone blocca le distrazioni durante la sessione. Quando la Modalità rigorosa è attiva, pausa e annullamento nell’app vengono disattivati, così il tuo blocco di lavoro profondo resta protetto fino alla fine del timer.',
      strictAlt: 'Impostazioni della Modalità rigorosa di Zone',
      protectedTitle: 'Concentrazione protetta.',
      protectedBody: 'Quando sei in Zone, il tuo iPhone diventa uno strumento dedicato alla produttività. Proteggiamo la tua attenzione per aiutarti a entrare nel ritmo, fare il lavoro e mantenere lo slancio.',
      protectedAlt: 'Sessione attiva di Zone',
      privacyTitle: 'La tua concentrazione, <br>i tuoi dati.',
      privacyBody: 'Zone usa un modello di privacy a conoscenza zero per le selezioni delle app e la cronologia di concentrazione. Non possiamo vedere, tracciare o monitorare le app specifiche che blocchi. Solo per le Live Activities, Zone invia lo stato minimo del timer necessario per aggiornare la schermata di blocco e Dynamic Island.',
      privacyLink: 'Leggi la nostra rigorosa Informativa sulla privacy',
      privacyAlt: 'Architettura a conoscenza zero di Zone',
      insightsTitle: 'Recupera il tuo tempo.',
      insightsBody: 'Crea slancio monitorando le tue serie giornaliere. Consulta la cronologia del lavoro profondo, scopri quante volte Zone è intervenuta e, se vuoi, sincronizza le sessioni completate direttamente con Apple Health come Mindful Minutes.',
      insightsAlt: 'Dashboard statistiche di Zone',
      dailyStreaks: 'Serie giornaliere',
      appleHealthSync: 'Sincronizzazione Apple Health',
    },
    support: {
      title: 'Supporto - Zone Focus App',
      description: 'Aiuto e supporto per Zone: ritrova la concentrazione.',
      headerTitle: 'Come possiamo aiutarti?',
      headerSubtitle: 'Supporto e domande frequenti su Zone.',
      contactTitle: 'Contatta il supporto',
      contactBody: 'Hai problemi o vuoi richiedere una funzione? Scrivi direttamente allo sviluppatore.',
      emailCta: 'Invia un’e-mail al supporto',
      faqTitle: 'Domande frequenti',
      faqs: [
        {
          q: 'Perché Zone richiede i permessi di Tempo di utilizzo?',
          a: 'Zone usa le API native FamilyControls e DeviceActivity di Apple per impedirti di aprire app che ti distraggono mentre una sessione di concentrazione è attiva. Questo permesso è necessario perché il blocco delle app funzioni nativamente su iOS.',
        },
        {
          q: 'Potete vedere quali app sto bloccando?',
          a: 'No. Zone funziona con un modello rigoroso di privacy a conoscenza zero per la selezione e il blocco delle app. I framework di Apple gestiscono la selezione delle app localmente sul tuo dispositivo, e noi non possiamo vedere, leggere o accedere ai nomi delle app, dei siti web o delle categorie che blocchi. Solo per le Live Activities, Zone invia un payload minimo di pianificazione del timer, come descritto nell’Informativa sulla privacy.',
        },
        {
          q: 'Zone usa un server?',
          a: 'Zone non usa un server per account, analytics, selezioni di app bloccate, cronologia di concentrazione, serie, statistiche, riepiloghi settimanali o dati di Apple Health. Un pianificatore minimo su Google Cloud viene usato solo per aiutare ad aggiornare Live Activities e Dynamic Island quando un timer termina mentre l’app non è aperta.',
        },
        {
          q: 'Come posso annullare una sessione se la Modalità rigorosa è attiva?',
          a: 'Non puoi. È proprio lo scopo della Modalità rigorosa. Se la attivi, il pulsante "Termina sessione" viene disattivato per impedirti di abbandonare il tuo blocco di lavoro profondo. Devi attendere la fine del timer per sbloccare le app protette.',
        },
        {
          q: 'Perché la Live Activity non compare nella Dynamic Island?',
          a: 'Assicurati di usare iOS 18 o versioni successive e controlla che le Live Activities siano abilitate per Zone nell’app Impostazioni dell’iPhone (Impostazioni &gt; Zone &gt; Live Activities).',
        },
        {
          q: 'Come funziona l’integrazione con Apple Health?',
          a: 'Se abilitata in Impostazioni, Zone può salvare le tue sessioni completate di lavoro profondo nell’app Apple Health come "Mindful Minutes". Richiediamo solo accesso in <em>scrittura</em>, quindi non possiamo leggere le tue metriche sanitarie personali. Se le sessioni non si sincronizzano, controlla <strong>Impostazioni iOS &gt; Salute &gt; Accesso ai dati e dispositivi &gt; Zone</strong> per verificare che il permesso sia stato concesso.',
        },
      ],
    },
    privacy: {
      title: 'Informativa sulla privacy - Zone Focus App',
      description: 'Informativa sulla privacy di Zone: dati di concentrazione a conoscenza zero con pianificazione minima delle Live Activities.',
      headerTitle: 'Informativa sulla privacy',
      effectiveDate: 'Data di entrata in vigore: 12 maggio 2026',
      translationNotice: 'Questa versione localizzata segue fedelmente il testo sorgente in inglese per mantenere le stesse informazioni e lo stesso ambito.',
      sections: [
        {
          title: '1. Architettura a conoscenza zero',
          body: 'Zone è costruita su un modello rigoroso di privacy a "conoscenza zero" per i tuoi dati di concentrazione. Non richiediamo un account, non tracciamo l’uso delle app, non monitoriamo il tuo tempo di utilizzo e non raccogliamo analytics sul tuo comportamento.',
        },
        {
          title: '2. Controlli familiari Apple',
          body: 'Per offrire le sue funzioni principali di blocco delle distrazioni, Zone usa le API native FamilyControls e ManagedSettings di Apple.',
          items: [
            '<strong class="text-gray-200">Elaborazione locale:</strong> l’elenco di applicazioni, siti web e categorie che scegli di bloccare è criptato e gestito da iOS.',
            '<strong class="text-gray-200">Nessun accesso da parte dello sviluppatore:</strong> non possiamo vedere, leggere o accedere ai nomi delle app, dei siti web o delle categorie che selezioni. Questi dati di selezione non lasciano mai il tuo dispositivo.',
          ],
        },
        {
          title: '3. Raccolta e archiviazione dei dati',
          body: 'Zone non raccoglie dati di account, identità, pubblicità, analytics, selezione delle app o tempo di utilizzo.',
          items: [
            'La cronologia delle tue sessioni di concentrazione, il tempo totale recuperato, i dati delle serie, le statistiche e i riepiloghi settimanali vengono salvati localmente sul tuo dispositivo.',
            'Non usiamo SDK di analytics di terze parti per tracciare il tuo comportamento o le interazioni sullo schermo.',
            'Non vendiamo, affittiamo o condividiamo i tuoi dati personali con inserzionisti o data broker.',
          ],
        },
        {
          title: '4. Live Activities e Dynamic Island',
          body: 'Zone usa il sistema Live Activity di Apple per mantenere aggiornato il timer sulla schermata di blocco e nella Dynamic Island. Per supportare gli aggiornamenti di completamento quando l’app non è aperta, Zone invia un payload minimo di pianificazione al nostro backend Google Cloud.',
          items: [
            '<strong class="text-gray-200">Cosa viene inviato:</strong> il token push della Live Activity, i secondi rimanenti del timer, lo stato in corso o completato e l’ambiente APNs.',
            '<strong class="text-gray-200">Cosa non viene inviato:</strong> l’elenco delle app bloccate, siti web, categorie di app, cronologia di concentrazione, serie, statistiche, dati di Apple Health, nome, indirizzo e-mail o informazioni dell’account.',
            '<strong class="text-gray-200">Finalità:</strong> questi dati vengono usati solo per pianificare e inviare aggiornamenti delle Live Activities tramite Apple Push Notification service.',
          ],
        },
        {
          title: '5. Integrazione con Apple Health',
          body: 'Zone offre una funzione opzionale per salvare le sessioni completate di lavoro profondo nell’app Apple Health come "Mindful Minutes".',
          items: [
            '<strong class="text-gray-200">Solo scrittura locale:</strong> Zone richiede solo il permesso di <em>scrivere</em> Mindful Minutes nel database locale di Apple Health. Non leggiamo le altre metriche sanitarie.',
            '<strong class="text-gray-200">Nessuna trasmissione:</strong> i tuoi dati di Apple Health non vengono mai trasmessi ai nostri server.',
            '<strong class="text-gray-200">Strettamente privato:</strong> non venderemo, condivideremo o useremo mai i tuoi dati di Apple Health per pubblicità, marketing o finalità di data brokerage.',
          ],
        },
        {
          title: '6. Modifiche a questa informativa',
          body: 'Se in futuro introdurremo funzioni opzionali che richiedono ulteriore trattamento dei dati o sincronizzazione, questa informativa sarà aggiornata, e tali funzioni richiederanno il tuo consenso esplicito e preventivo quando richiesto.',
        },
        {
          title: '7. Contatti',
          body: 'Se hai domande sulle nostre pratiche relative alla privacy, contattaci all’indirizzo <a href="mailto:vikas.dev.ios@gmail.com" class="text-systemBlue hover:underline">vikas.dev.ios@gmail.com</a>.',
        },
      ],
    },
  },
};

function withOverrides(base, overrides) {
  return {
    common: { ...base.common, ...overrides.common },
    home: { ...base.home, ...overrides.home },
    support: { ...base.support, ...overrides.support },
    privacy: { ...base.privacy, ...overrides.privacy },
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#96;');
}

function pagePath(locale, page) {
  return locale.dir === '.' ? `${page}.html` : `${locale.dir}/${page}.html`;
}

function absoluteUrl(locale, page) {
  return `${siteUrl}/${pagePath(locale, page)}`;
}

function relativeHref(currentLocale, targetLocale, page) {
  if (currentLocale.dir === '.') {
    return pagePath(targetLocale, page);
  }

  if (targetLocale.dir === '.') {
    return `../${page}.html`;
  }

  if (currentLocale.dir === targetLocale.dir) {
    return `${page}.html`;
  }

  return `../${targetLocale.dir}/${page}.html`;
}

function assetPath(locale, path) {
  return locale.dir === '.' ? path : `../${path}`;
}

function alternateLinks(page) {
  return [
    ...locales.map((locale) => `    <link rel="alternate" hreflang="${locale.code}" href="${absoluteUrl(locale, page)}">`),
    `    <link rel="alternate" hreflang="x-default" href="${absoluteUrl(locales[0], page)}">`,
  ].join('\n');
}

function languageSwitcher(locale, page, copy) {
  const options = locales.map((target) => {
    const selected = target.code === locale.code ? ' selected' : '';
    return `<option value="${escapeAttribute(relativeHref(locale, target, page))}"${selected}>${escapeHtml(target.label)}</option>`;
  }).join('');

  return `
                <label class="sr-only" for="language-switcher">${escapeHtml(copy.common.language)}</label>
                <select id="language-switcher" class="max-w-[150px] rounded-full border border-gray-700 bg-black px-3 py-2 text-xs text-gray-300 outline-none transition-colors hover:border-gray-500 focus:border-systemBlue" onchange="window.location.href = this.value">
                    ${options}
                </select>`;
}

function nav(locale, page, copy, widthClass) {
  const showSupport = page !== 'support';
  const showPrivacy = page !== 'privacy';
  const support = showSupport ? `<a href="${relativeHref(locale, locale, 'support')}" class="text-sm text-gray-400 hover:text-white transition-colors">${escapeHtml(copy.common.support)}</a>` : '';
  const privacy = showPrivacy ? `<a href="${relativeHref(locale, locale, 'privacy')}" class="text-sm text-gray-400 hover:text-white transition-colors">${escapeHtml(page === 'index' ? copy.common.privacy : copy.common.privacyPolicy)}</a>` : '';

  return `
    <nav class="w-full border-b border-gray-800 bg-black/80 backdrop-blur-md fixed top-0 z-50">
        <div class="${widthClass} mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
            <a href="${relativeHref(locale, locale, 'index')}" class="text-xl font-bold tracking-tight">Zone</a>
            <div class="flex items-center gap-4 sm:gap-6">
                ${support}
                ${privacy}
                ${languageSwitcher(locale, page, copy)}
            </div>
        </div>
    </nav>`;
}

function head(locale, page, title, description) {
  return `<!DOCTYPE html>
<html lang="${locale.code}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeAttribute(description)}">
    <link rel="canonical" href="${absoluteUrl(locale, page)}">
${alternateLinks(page)}
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        systemBlue: '#007AFF',
                        systemGray: '#1C1C1E',
                    },
                    fontFamily: {
                        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
                    }
                }
            }
        }
    </script>
</head>`;
}

function footer(locale, copy, widthClass, includeLinks = true) {
  const links = includeLinks ? `
            <div class="space-x-6 text-sm">
                <a href="${relativeHref(locale, locale, 'support')}" class="text-gray-500 hover:text-white transition-colors">${escapeHtml(copy.common.support)}</a>
                <a href="${relativeHref(locale, locale, 'privacy')}" class="text-gray-500 hover:text-white transition-colors">${escapeHtml(copy.common.privacyPolicy)}</a>
            </div>` : '';

  return `
    <footer class="w-full border-t border-gray-800 bg-black">
        <div class="${widthClass} mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="text-gray-500 text-sm">
                &copy; 2026 Vikas Saini. ${escapeHtml(copy.common.rights)}
            </div>${links}
        </div>
    </footer>`;
}

function appleIcon() {
  return '<svg class="w-6 h-6 mr-3 fill-current" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>';
}

function renderHome(locale, copy) {
  const c = copy.home;
  return `${head(locale, 'index', c.title, c.description)}
<body class="bg-black text-white font-sans antialiased min-h-screen flex flex-col selection:bg-systemBlue selection:text-white">
${nav(locale, 'index', copy, 'max-w-6xl')}

    <main class="flex-grow pt-32 pb-0">
        <section class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 mb-24">
            <div class="flex-1 text-center lg:text-left pt-6">
                <h1 class="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">${c.heroTitle}</h1>
                <p class="text-xl text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">${escapeHtml(c.heroBody)}</p>
                <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a href="https://apps.apple.com/app/id6763581982" target="_blank" rel="noopener" class="inline-flex items-center justify-center bg-systemBlue text-white font-semibold py-4 px-8 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 w-full sm:w-auto text-lg border border-blue-400/20">
                        ${appleIcon()}
                        ${escapeHtml(c.appStoreCta)}
                    </a>
                </div>
            </div>
            <div class="flex-1 flex justify-center lg:justify-end relative">
                <div class="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full w-3/4 h-3/4 m-auto"></div>
                <img src="${assetPath(locale, 'images/screen-timer.png')}" alt="${escapeAttribute(c.timerAlt)}" class="relative z-10 w-full max-w-[320px] rounded-[3rem] border-[6px] border-gray-900 shadow-2xl shadow-black">
            </div>
        </section>

        <section class="bg-systemGray border-y border-gray-800 py-24">
            <div class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
                <div class="flex-1 text-center lg:text-left">
                    <h2 class="text-3xl lg:text-5xl font-bold mb-6">${escapeHtml(c.appPickerTitle)}</h2>
                    <p class="text-lg text-gray-400 leading-relaxed mb-6">${escapeHtml(c.appPickerBody)}</p>
                </div>
                <div class="flex-1 flex justify-center lg:justify-start">
                    <img src="${assetPath(locale, 'images/screen-app-picker.png')}" alt="${escapeAttribute(c.appPickerAlt)}" class="w-full max-w-[280px] rounded-[2.5rem] border border-gray-700 shadow-xl shadow-black/50">
                </div>
            </div>
        </section>

        <section class="py-24">
            <div class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                <div class="flex-1 text-center lg:text-left">
                    <h2 class="text-3xl lg:text-5xl font-bold mb-6">${escapeHtml(c.strictTitle)}</h2>
                    <p class="text-lg text-gray-400 leading-relaxed mb-6">${escapeHtml(c.strictBody)}</p>
                </div>
                <div class="flex-1 flex justify-center lg:justify-end">
                    <img src="${assetPath(locale, 'images/screen-settings.png')}" alt="${escapeAttribute(c.strictAlt)}" class="w-full max-w-[280px] rounded-[2.5rem] border border-gray-800 shadow-xl shadow-black/50">
                </div>
            </div>
        </section>

        <section class="bg-systemGray border-y border-gray-800 py-24">
            <div class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
                <div class="flex-1 text-center lg:text-left">
                    <h2 class="text-3xl lg:text-5xl font-bold mb-6">${escapeHtml(c.protectedTitle)}</h2>
                    <p class="text-lg text-gray-400 leading-relaxed mb-6">${escapeHtml(c.protectedBody)}</p>
                </div>
                <div class="flex-1 flex justify-center lg:justify-start relative">
                    <div class="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full w-full h-full m-auto"></div>
                    <img src="${assetPath(locale, 'images/screen-active-session.png')}" alt="${escapeAttribute(c.protectedAlt)}" class="relative z-10 w-full max-w-[280px] rounded-[2.5rem] border border-gray-700 shadow-xl shadow-black/50">
                </div>
            </div>
        </section>

        <section class="py-24">
            <div class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
                <div class="flex-1 text-center lg:text-left">
                    <h2 class="text-3xl lg:text-5xl font-bold mb-6">${c.privacyTitle}</h2>
                    <p class="text-lg text-gray-400 leading-relaxed mb-6">${escapeHtml(c.privacyBody)}</p>
                    <a href="${relativeHref(locale, locale, 'privacy')}" class="text-systemBlue hover:underline font-medium">${escapeHtml(c.privacyLink)} &rarr;</a>
                </div>
                <div class="flex-1 flex justify-center lg:justify-end">
                    <img src="${assetPath(locale, 'images/screen-privacy.png')}" alt="${escapeAttribute(c.privacyAlt)}" class="w-full max-w-[280px] rounded-[2.5rem] border border-gray-800 shadow-xl shadow-black/50">
                </div>
            </div>
        </section>

        <section class="bg-systemGray border-t border-gray-800 py-24">
            <div class="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
                <div class="flex-1 text-center lg:text-left">
                    <h2 class="text-3xl lg:text-5xl font-bold mb-6">${escapeHtml(c.insightsTitle)}</h2>
                    <p class="text-lg text-gray-400 leading-relaxed mb-4">${escapeHtml(c.insightsBody)}</p>
                    <div class="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-gray-800 text-sm text-gray-300 shadow-sm">
                            <span aria-hidden="true">🔥</span> ${escapeHtml(c.dailyStreaks)}
                        </div>
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-gray-800 text-sm text-gray-300 shadow-sm">
                            <span aria-hidden="true">🍎</span> ${escapeHtml(c.appleHealthSync)}
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex justify-center lg:justify-start">
                    <img src="${assetPath(locale, 'images/screen-insights.png')}" alt="${escapeAttribute(c.insightsAlt)}" class="w-full max-w-[280px] rounded-[2.5rem] border border-gray-700 shadow-xl shadow-black/50">
                </div>
            </div>
        </section>
    </main>
${footer(locale, copy, 'max-w-6xl')}
</body>
</html>
`;
}

function renderSupport(locale, copy) {
  const c = copy.support;
  return `${head(locale, 'support', c.title, c.description)}
<body class="bg-black text-white font-sans antialiased min-h-screen flex flex-col">
${nav(locale, 'support', copy, 'max-w-4xl')}

    <main class="flex-grow pt-32 pb-16 px-6">
        <div class="max-w-3xl mx-auto">
            <header class="mb-16 text-center">
                <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">${escapeHtml(c.headerTitle)}</h1>
                <p class="text-xl text-gray-400">${escapeHtml(c.headerSubtitle)}</p>
            </header>

            <div class="bg-systemGray rounded-2xl p-8 mb-16 text-center border border-gray-800">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-systemBlue mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-semibold mb-2">${escapeHtml(c.contactTitle)}</h2>
                <p class="text-gray-400 mb-6">${escapeHtml(c.contactBody)}</p>
                <a href="mailto:vikas.dev.ios@gmail.com?subject=${encodeURIComponent(copy.common.supportSubject)}" class="inline-block bg-systemBlue text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">
                    ${escapeHtml(c.emailCta)}
                </a>
            </div>

            <h2 class="text-2xl font-bold mb-8">${escapeHtml(c.faqTitle)}</h2>
            <div class="space-y-6">
                ${c.faqs.map((faq) => `
                <div class="bg-systemGray rounded-xl p-6 border border-gray-800">
                    <h3 class="text-lg font-semibold mb-2 text-white">${escapeHtml(faq.q)}</h3>
                    <p class="text-gray-400 leading-relaxed">${faq.a}</p>
                </div>`).join('\n')}
            </div>
        </div>
    </main>
${footer(locale, copy, 'max-w-4xl', false)}
</body>
</html>
`;
}

function renderPrivacy(locale, copy) {
  const c = copy.privacy;
  return `${head(locale, 'privacy', c.title, c.description)}
<body class="bg-black text-white font-sans antialiased min-h-screen flex flex-col">
${nav(locale, 'privacy', copy, 'max-w-4xl')}

    <main class="flex-grow pt-32 pb-16 px-6">
        <div class="max-w-3xl mx-auto">
            <header class="mb-12 text-center">
                <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">${escapeHtml(c.headerTitle)}</h1>
                <p class="text-xl text-systemBlue font-medium">${escapeHtml(c.effectiveDate)}</p>
                ${c.translationNotice ? `<p class="mt-4 text-sm text-gray-500 leading-relaxed">${escapeHtml(c.translationNotice)}</p>` : ''}
            </header>

            <div class="bg-systemGray rounded-2xl p-8 md:p-12 border border-gray-800 space-y-10 shadow-xl shadow-black/50">
                ${c.sections.map((section) => `
                <section>
                    <h2 class="text-2xl font-semibold mb-4 text-white">${escapeHtml(section.title)}</h2>
                    <p class="text-gray-400 leading-relaxed${section.items ? ' mb-4' : ''}">${section.body}</p>
                    ${section.items ? `<ul class="list-disc list-outside ml-6 text-gray-400 leading-relaxed space-y-3">
                        ${section.items.map((item) => `<li>${item}</li>`).join('\n                        ')}
                    </ul>` : ''}
                </section>`).join('\n')}
            </div>
        </div>
    </main>
${footer(locale, copy, 'max-w-4xl', false)}
</body>
</html>
`;
}

const renderers = {
  index: renderHome,
  support: renderSupport,
  privacy: renderPrivacy,
};

for (const locale of locales) {
  const copy = translations[locale.code];
  if (!copy) {
    throw new Error(`Missing translations for ${locale.code}`);
  }

  for (const page of pages) {
    const filePath = join(rootDir, pagePath(locale, page));
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, renderers[page](locale, copy), 'utf8');
  }
}

console.log(`Generated ${locales.length * pages.length} localized pages.`);
