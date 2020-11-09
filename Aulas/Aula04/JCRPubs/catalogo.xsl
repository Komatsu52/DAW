<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <title>Catálogo de publicações do JCR</title>                    
                </head>
                <body>
                    <h2>Catálogo de publicações do JCR</h2>
                    <ul>
                        <xsl:apply-templates select="/bibliography/*[not(year=preceding::year)]">
                            <xsl:sort select="year" data-type="number" order="descending"/>
                        </xsl:apply-templates>
                    </ul>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates mode="singlepages"/>
    </xsl:template>
    
    <xsl:template match="/bibliography/*" mode="singlepages">
        <xsl:result-document href="site/{@id}.html">
            <html>
                <head>
                    <title><xsl:value-of select="@id"/></title>
                </head>
                <body>
                    <h2><xsl:value-of select="title"/></h2>
                    <dl>
                        <xsl:for-each select="*">
                            <dt><xsl:value-of select="name(.)"/></dt>
                            <dd><xsl:value-of select="."/></dd>
                        </xsl:for-each>
                    </dl>
                    <address>[<a href="index.html">Voltar ao índice</a>]</address>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
    
    <xsl:template match="bibliography/*">
        <xsl:variable name="y" select="year"/>
        <li>
            <xsl:value-of select="year"/>
            <ul>
                <xsl:apply-templates select="/bibliography/*[year=$y]" mode="subindex">
                    <xsl:sort select="title"/>
                </xsl:apply-templates>
            </ul>
        </li>        
    </xsl:template>
    
    <xsl:template match="bibliography/*" mode="subindex">
        <li>
            <a href="{@id}.html"><xsl:value-of select="title"/></a>     
        </li>
    </xsl:template>
</xsl:stylesheet>